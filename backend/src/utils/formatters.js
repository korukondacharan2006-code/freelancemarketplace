const ROLES = {
  CLIENT: 'CLIENT',
  FREELANCER: 'FREELANCER',
  ADMIN: 'ADMIN',
}

function toApiRole(role) {
  return role ? role.toLowerCase() : 'client'
}

function toDbRole(role) {
  const r = (role || 'client').toUpperCase()

  if (r === 'CLIENT') return 'CLIENT'
  if (r === 'FREELANCER') return 'FREELANCER'
  if (r === 'ADMIN') return 'ADMIN'

  return 'CLIENT'
}

function formatUser(user) {
  if (!user) return null

  const { password, ...safeUser } = user

  return {
    ...safeUser,
    role: toApiRole(safeUser.role)
  }
}

module.exports = {
  ROLES,
  toApiRole,
  toDbRole,
  formatUser
}