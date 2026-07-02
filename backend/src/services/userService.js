const prisma = require('../utils/prisma')
const { AppError } = require('../utils/response')
const { formatUser } = require('../utils/formatters')

async function getProfile(userId) {
  const user = await prisma.user.findUnique({ where: { id: userId } })

  if (!user) {
    throw new AppError('User not found', 404)
  }

  return formatUser(user)
}

async function updateProfile(userId, data) {
  const { name, title, bio, skills, hourlyRate } = data

  const user = await prisma.user.update({
    where: { id: userId },
    data: {
      ...(name !== undefined && { name }),
      ...(title !== undefined && { title }),
      ...(bio !== undefined && { bio }),
      ...(skills !== undefined && {
        skills: Array.isArray(skills)
          ? skills
          : skills.split(',').map((s) => s.trim()).filter(Boolean),
      }),
      ...(hourlyRate !== undefined && { hourlyRate: Number(hourlyRate) }),
    },
  })

  return formatUser(user)
}

module.exports = { getProfile, updateProfile }
