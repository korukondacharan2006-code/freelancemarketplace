const { Router } = require('express')
const dashboardController = require('../controllers/dashboardController')
const { authenticate, authorize } = require('../middleware/auth')

const router = Router()

router.use(authenticate)

router.get('/admin', authorize('ADMIN'), dashboardController.getDashboard)
router.get('/client', authorize('CLIENT'), dashboardController.getClientDashboard)
router.get('/freelancer', authorize('FREELANCER'), dashboardController.getFreelancerDashboard)

module.exports = router
