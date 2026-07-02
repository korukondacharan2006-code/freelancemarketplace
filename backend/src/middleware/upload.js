const multer = require('multer')
const path = require('path')
const fs = require('fs')

// Upload folders
const uploadDirs = {
  profile: path.join(__dirname, '../../uploads/profile-images'),
  resume: path.join(__dirname, '../../uploads/resumes'),
  portfolio: path.join(__dirname, '../../uploads/portfolios'),
  project: path.join(__dirname, '../../uploads/project-attachments'),
}

// Create folders if they don't exist
Object.values(uploadDirs).forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
})

// Storage
const storage = multer.diskStorage({
  destination(req, file, cb) {
    switch (file.fieldname) {
      case 'profileImage':
      case 'file':
        return cb(null, uploadDirs.profile)

      case 'resume':
        return cb(null, uploadDirs.resume)

      case 'portfolio':
        return cb(null, uploadDirs.portfolio)

      case 'attachment':
        return cb(null, uploadDirs.project)

      default:
        return cb(null, uploadDirs.profile)
    }
  },

  filename(req, file, cb) {
    const uniqueName =
      Date.now() +
      '-' +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname)

    cb(null, uniqueName)
  },
})

// Allowed files
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'application/pdf',
  ]

  if (allowedMimeTypes.includes(file.mimetype)) {
    return cb(null, true)
  }

  cb(new Error('Only JPG, JPEG, PNG and PDF files are allowed'))
}

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
})

module.exports = upload