class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = true
  }
}

function success(res, data, statusCode = 200) {
  return res.status(statusCode).json({ success: true, data })
}

function created(res, data) {
  return success(res, data, 201)
}

function error(res, message, statusCode = 500) {
  return res.status(statusCode).json({ success: false, message })
}

module.exports = { AppError, success, created, error }
