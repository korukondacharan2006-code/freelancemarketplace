const prisma = require('../utils/prisma')
const { hashPassword, comparePassword } = require('../utils/password')
const { signToken } = require('../utils/jwt')
const { AppError } = require('../utils/response')
const { toDbRole, formatUser } = require('../utils/formatters')

async function register({ name, email, password, role }) {
  console.log("REGISTER BODY:", { name, email, role })

  if (!name || !email || !password) {
    throw new AppError('Name, email, password required', 400)
  }

  if (password.length < 8) {
    throw new AppError('Password must be at least 8 characters', 400)
  }

  const existingUser = await prisma.user.findUnique({
    where: { email }
  })

  if (existingUser) {
    throw new AppError('Email already exists', 409)
  }

  const hashedPassword = await hashPassword(password)

  const dbRole = toDbRole(role)

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: dbRole
    }
  })

  const token = signToken({
    userId: user.id,
    role: user.role
  })

  return {
    token,
    user: formatUser(user)
  }
}

async function login({ email, password }) {
  console.log("LOGIN BODY:", { email })

  if (!email || !password) {
    throw new AppError('Email and password required', 400)
  }

  const user = await prisma.user.findUnique({
    where: { email }
  })

  if (!user) {
    throw new AppError('Invalid credentials', 401)
  }

  const isValid = await comparePassword(password, user.password)

  if (!isValid) {
    throw new AppError('Invalid credentials', 401)
  }

  const token = signToken({
    userId: user.id,
    role: user.role
  })

  return {
    token,
    user: formatUser(user)
  }
}

async function getMe(userId) {
  const user = await prisma.user.findUnique({
    where: { id: userId }
  })

  if (!user) {
    throw new AppError('User not found', 404)
  }

  return formatUser(user)
}

module.exports = {
  register,
  login,
  getMe
}