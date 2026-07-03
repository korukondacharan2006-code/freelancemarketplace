const ROLES = {
  CLIENT: 'CLIENT',
  FREELANCER: 'FREELANCER',
  ADMIN: 'ADMIN'
}

function toApiRole(role) {
  if (!role) return 'client'
  return role.toLowerCase()
}

function toDbRole(role) {
  if (!role) return 'CLIENT'
  return role.toUpperCase()
}

function formatUser(user) {
  if (!user) return null

  const { password, ...rest } = user

  return {
    ...rest,
    role: toApiRole(rest.role)
  }
}

module.exports = {
  ROLES,
  toApiRole,
  toDbRole,
  formatUser
}