const projectService = require('../services/projectService')
const { success, created } = require('../utils/response')

async function getProjects(req, res, next) {
  try {
    const { status, category, search } = req.query
    const projects = await projectService.getAllProjects({ status, category, search })
    success(res, projects)
  } catch (err) {
    next(err)
  }
}

async function getMyProjects(req, res, next) {
  try {
    const projects = await projectService.getMyProjects(req.user.id)
    success(res, projects)
  } catch (err) {
    next(err)
  }
}

async function getProject(req, res, next) {
  try {
    const project = await projectService.getProjectById(req.params.id)
    success(res, project)
  } catch (err) {
    next(err)
  }
}

async function createProject(req, res, next) {
  try {
    const project = await projectService.createProject(req.user.id, req.body)
    created(res, project)
  } catch (err) {
    next(err)
  }
}

async function updateProject(req, res, next) {
  try {
    const project = await projectService.updateProject(req.params.id, req.user.id, req.body)
    success(res, project)
  } catch (err) {
    next(err)
  }
}

async function deleteProject(req, res, next) {
  try {
    const result = await projectService.deleteProject(req.params.id, req.user.id)
    success(res, result)
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getProjects,
  getMyProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
}
