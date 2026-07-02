const prisma = require('../utils/prisma')
const { formatProject } = require('../utils/formatters')

async function searchProjects(query) {
  const {
    keyword,
    category,
    status,
    minBudget,
    maxBudget,
  } = query

  const where = {}

  if (keyword) {
    where.OR = [
      {
        title: {
          contains: keyword,
          mode: 'insensitive',
        },
      },
      {
        description: {
          contains: keyword,
          mode: 'insensitive',
        },
      },
    ]
  }

  if (category) {
    where.category = category
  }

  if (status) {
    where.status = status.toUpperCase()
  }

  if (minBudget || maxBudget) {
    where.budget = {}

    if (minBudget) {
      where.budget.gte = Number(minBudget)
    }

    if (maxBudget) {
      where.budget.lte = Number(maxBudget)
    }
  }

  const projects = await prisma.project.findMany({
    where,
    include: {
      client: {
        select: {
          name: true,
        },
      },
      _count: {
        select: {
          bids: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return projects.map(formatProject)
}

module.exports = {
  searchProjects,
}