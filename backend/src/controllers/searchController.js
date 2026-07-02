const searchService = require('../services/searchService')
const { success } = require('../utils/response')

async function searchProjects(req, res, next) {
  try {
    const projects = await searchService.searchProjects(req.query)
    success(res, projects)
  } catch (err) {
    next(err)
  }
}

module.exports = {
  searchProjects,
}