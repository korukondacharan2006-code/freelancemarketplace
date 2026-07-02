const prisma = require('../utils/prisma')
const { hashPassword, comparePassword } = require('../utils/password')
const { signToken } = require('../utils/jwt')
const { AppError } = require('../utils/response')
const { toDbRole, formatUser } = require('../utils/formatters')

async function register({ name, email, password, role }) {
  if (!name || !email || !password) {
    throw new AppError('Name, email, and password are required', 400)
  }

  if (password.length < 8) {
    throw new AppError('Password must be at least 8 characters', 400)
  }

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    throw new AppError('Email already registered', 409)
  }

  const hashedPassword = await hashPassword(password)
  const dbRole = toDbRole(role)

  if (!['CLIENT', 'FREELANCER'].includes(dbRole)) {
    throw new AppError('Role must be client or freelancer', 400)
  }

let user

try {
  console.log("Before creating user...")

  user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: dbRole,
    },
  })

  console.log("User created successfully:", user)

} catch (error) {
  console.error("PRISMA CREATE ERROR:")
  console.error(error)
  throw error
}

  const token = signToken({ userId: user.id, role: user.role })

  return {
    token,
    user: formatUser(user),
  }
}

async function login({ email, password }) {
  if (!email || !password) {
    throw new AppError('Email and password are required', 400)
  }

  const user = await prisma.user.findUnique({ where: { email } })

  if (!user) {
    throw new AppError('Invalid email or password', 401)
  }

  const valid = await comparePassword(password, user.password)

  if (!valid) {
    throw new AppError('Invalid email or password', 401)
  }

  const token = signToken({ userId: user.id, role: user.role })

  return {
    token,
    user: formatUser(user),
  }
}

async function getMe(userId) {
  const user = await prisma.user.findUnique({ where: { id: userId } })

  if (!user) {
    throw new AppError('User not found', 404)
  }

  return formatUser(user)
}

module.exports = { register, login, getMe }
