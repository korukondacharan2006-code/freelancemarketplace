const path = require('path')

function uploadFile(type) {
  return (req, res) => {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded',
      })
    }

    let folder = ''

    switch (type) {
      case 'Profile image':
        folder = 'profile-images'
        break

      case 'Resume':
        folder = 'resumes'
        break

      case 'Portfolio':
        folder = 'portfolios'
        break

      case 'Project attachment':
        folder = 'project-attachments'
        break

      default:
        folder = ''
    }

    return res.status(200).json({
      success: true,
      message: `${type} uploaded successfully`,
      data: {
        filename: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size,
        mimeType: req.file.mimetype,
        url: `http://localhost:3000/uploads/${folder}/${req.file.filename}`,
      },
    })
  }
}

module.exports = {
  uploadProfileImage: uploadFile('Profile image'),
  uploadResume: uploadFile('Resume'),
  uploadPortfolio: uploadFile('Portfolio'),
  uploadProjectAttachment: uploadFile('Project attachment'),
}