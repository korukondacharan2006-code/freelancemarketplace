const { Router } = require('express')
const upload = require('../middleware/upload')
const {
  uploadProfileImage,
  uploadResume,
  uploadPortfolio,
  uploadProjectAttachment,
} = require('../controllers/uploadController')

const { authenticate } = require('../middleware/auth')

const router = Router()

router.use(authenticate)

// Upload Profile Image
router.post(
  '/profile-image',
  upload.single('profileImage'),
  uploadProfileImage
)

// Upload Resume
router.post(
  '/resume',
  upload.single('resume'),
  uploadResume
)

// Upload Portfolio
router.post(
  '/portfolio',
  upload.single('portfolio'),
  uploadPortfolio
)

// Upload Project Attachment
router.post(
  '/project-attachment',
  upload.single('attachment'),
  uploadProjectAttachment
)

module.exports = router