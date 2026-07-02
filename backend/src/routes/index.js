const { Router } = require('express')

const authRoutes = require('./authRoutes')
const userRoutes = require('./userRoutes')
const projectRoutes = require('./projectRoutes')
const bidRoutes = require('./bidRoutes')
const dashboardRoutes = require('./dashboardRoutes')
const uploadRoutes = require('./uploadRoutes')
const searchRoutes = require('./searchRoutes')

const router = Router()

router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'FreelanceHub API is running',
  })
})

router.use('/auth', authRoutes)
router.use('/users', userRoutes)
router.use('/projects', projectRoutes)
router.use('/bids', bidRoutes)
router.use('/dashboard', dashboardRoutes)
router.use('/upload', uploadRoutes)
router.use('/search', searchRoutes)

module.exports = router