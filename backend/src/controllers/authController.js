const authService = require('../services/authService')
const { success, created } = require('../utils/response')

async function register(req, res, next) {
  try {
    console.log("REGISTER BODY:", req.body)

    const result = await authService.register(req.body)

    created(res, result)
  } catch (err) {
    console.error("REGISTER ERROR:", err)
    next(err)
  }
}

async function login(req, res, next) {
  try {
    console.log("LOGIN BODY:", req.body)

    const result = await authService.login(req.body)

    success(res, result)
  } catch (err) {
  console.error("LOGIN ERROR:", err)
  next(err)
}
}

async function getMe(req, res, next) {
  try {
    const user = await authService.getMe(req.user.id)

    success(res, user)
  } catch (err) {
    next(err)
  }
}

module.exports = {
  register,
  login,
  getMe,
}