const ROLES = {
  CLIENT: 'CLIENT',
  FREELANCER: 'FREELANCER',
  ADMIN: 'ADMIN',
}

function toApiRole(role) {
  return role.toLowerCase()
}

function toDbRole(role) {
  if (!role) return ROLES.CLIENT
  return role.toUpperCase()
}

function formatUser(user) {
  if (!user) return null
  const { password, ...rest } = user
  return {
    ...rest,
    role: toApiRole(rest.role),
  }
}

function formatProject(project) {
  if (!project) return null
  return {
    id: project.id,
    title: project.title,
    description: project.description,
    budget: project.budget,
    status: project.status.toLowerCase(),
    category: project.category,
    clientId: project.clientId,
    clientName: project.client?.name ?? project.clientName,
    createdAt: project.createdAt.toISOString().split('T')[0],
    deadline: project.deadline
      ? project.deadline.toISOString().split('T')[0]
      : undefined,
    skills: project.skills,
    bidsCount: project._count?.bids ?? project.bidsCount ?? 0,
  }
}

function formatBid(bid) {
  if (!bid) return null
  return {
    id: bid.id,
    projectId: bid.projectId,
    projectTitle: bid.project?.title ?? bid.projectTitle,
    freelancerId: bid.freelancerId,
    freelancerName: bid.freelancer?.name ?? bid.freelancerName,
    amount: bid.amount,
    proposal: bid.proposal,
    status: bid.status.toLowerCase(),
    createdAt: bid.createdAt.toISOString().split('T')[0],
  }
}

module.exports = {
  ROLES,
  toApiRole,
  toDbRole,
  formatUser,
  formatProject,
  formatBid,
}
