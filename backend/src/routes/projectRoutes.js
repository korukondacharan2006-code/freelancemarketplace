const { Router } = require('express')
const projectController = require('../controllers/projectController')
const uploadController = require('../controllers/uploadController')
const upload = require('../middleware/upload')
const { authenticate, authorize } = require('../middleware/auth')

const router = Router()

// Public
router.get('/', projectController.getProjects)

// IMPORTANT: specific routes first
router.get('/my', authenticate, authorize('CLIENT'), projectController.getMyProjects)

router.get('/:id', projectController.getProject)

router.post('/', authenticate, authorize('CLIENT'), projectController.createProject)

router.patch('/:id', authenticate, authorize('CLIENT'), projectController.updateProject)

router.delete('/:id', authenticate, authorize('CLIENT'), projectController.deleteProject)

router.post(
  '/:id/attachment',
  authenticate,
  authorize('CLIENT'),
  upload.single('attachment'),
  uploadController.uploadProjectAttachment
)

module.exports = router