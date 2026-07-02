const { Router } = require('express')
const userController = require('../controllers/userController')
const uploadController = require('../controllers/uploadController')
const upload = require('../middleware/upload')
const { authenticate } = require('../middleware/auth')

const router = Router()

router.use(authenticate)

// Profile
router.get('/profile', userController.getProfile)
router.patch('/profile', userController.updateProfile)

// Uploads
router.post(
  '/profile-image',
  upload.single('profileImage'),
  uploadController.uploadProfileImage
)

router.post(
  '/resume',
  upload.single('resume'),
  uploadController.uploadResume
)

router.post(
  '/portfolio',
  upload.single('portfolio'),
  uploadController.uploadPortfolio
)

module.exports = router