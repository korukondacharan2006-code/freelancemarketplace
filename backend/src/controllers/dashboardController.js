const adminService = require('../services/adminService')
const { success } = require('../utils/response')
const { formatProject } = require('../utils/formatters')

async function getDashboard(req, res, next) {
  try {
    const data = await adminService.getDashboardStats()
    success(res, {
      stats: data.stats,
      recentProjects: data.recentProjects.map((p) =>
        formatProject({ ...p, clientName: p.client.name }),
      ),
    })
  } catch (err) {
    next(err)
  }
}

async function getClientDashboard(req, res, next) {
  try {
    const stats = await adminService.getClientStats(req.user.id)
    success(res, { stats })
  } catch (err) {
    next(err)
  }
}

async function getFreelancerDashboard(req, res, next) {
  try {
    const stats = await adminService.getFreelancerStats(req.user.id)
    success(res, { stats })
  } catch (err) {
    next(err)
  }
}

module.exports = { getDashboard, getClientDashboard, getFreelancerDashboard }
