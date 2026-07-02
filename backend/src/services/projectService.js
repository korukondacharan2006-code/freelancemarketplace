const prisma = require('../utils/prisma')
const { AppError } = require('../utils/response')
const { formatProject } = require('../utils/formatters')

const projectInclude = {
  client: { select: { id: true, name: true } },
  _count: { select: { bids: true } },
}

async function getAllProjects(filters = {}) {
  const { status, category, search } = filters

  const where = {}

  if (status) {
    where.status = status.toUpperCase()
  }

  if (category) {
    where.category = category
  }

  if (search) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
    ]
  }

  const projects = await prisma.project.findMany({
    where,
    include: projectInclude,
    orderBy: { createdAt: 'desc' },
  })

  return projects.map(formatProject)
}

async function getMyProjects(clientId) {
  const projects = await prisma.project.findMany({
    where: { clientId },
    include: projectInclude,
    orderBy: { createdAt: 'desc' },
  })

  return projects.map(formatProject)
}

async function getProjectById(id) {
  const project = await prisma.project.findUnique({
    where: { id },
    include: projectInclude,
  })

  if (!project) {
    throw new AppError('Project not found', 404)
  }

  return formatProject(project)
}

async function createProject(clientId, data) {
  const { title, description, budget, category, deadline, skills } = data

  if (!title || !description || !budget || !category) {
    throw new AppError('Title, description, budget, and category are required', 400)
  }

  const project = await prisma.project.create({
    data: {
      title,
      description,
      budget: Number(budget),
      category,
      deadline: deadline ? new Date(deadline) : null,
      skills: Array.isArray(skills)
        ? skills
        : skills
          ? skills.split(',').map((s) => s.trim()).filter(Boolean)
          : [],
      clientId,
    },
    include: projectInclude,
  })

  return formatProject(project)
}

async function updateProject(id, clientId, data) {
  const project = await prisma.project.findUnique({ where: { id } })

  if (!project) {
    throw new AppError('Project not found', 404)
  }

  if (project.clientId !== clientId) {
    throw new AppError('Not authorized to update this project', 403)
  }

  const { title, description, budget, category, deadline, skills, status } = data

  const updated = await prisma.project.update({
    where: { id },
    data: {
      ...(title !== undefined && { title }),
      ...(description !== undefined && { description }),
      ...(budget !== undefined && { budget: Number(budget) }),
      ...(category !== undefined && { category }),
      ...(deadline !== undefined && { deadline: deadline ? new Date(deadline) : null }),
      ...(skills !== undefined && {
        skills: Array.isArray(skills)
          ? skills
          : skills.split(',').map((s) => s.trim()).filter(Boolean),
      }),
      ...(status !== undefined && { status: status.toUpperCase() }),
    },
    include: projectInclude,
  })

  return formatProject(updated)
}

async function deleteProject(id, clientId) {
  const project = await prisma.project.findUnique({ where: { id } })

  if (!project) {
    throw new AppError('Project not found', 404)
  }

  if (project.clientId !== clientId) {
    throw new AppError('Not authorized to delete this project', 403)
  }

  await prisma.project.delete({ where: { id } })

  return { message: 'Project deleted successfully' }
}

module.exports = {
  getAllProjects,
  getMyProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
}
