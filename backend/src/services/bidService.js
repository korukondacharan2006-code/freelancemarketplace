const prisma = require('../utils/prisma')
const { AppError } = require('../utils/response')
const { formatBid } = require('../utils/formatters')

const bidInclude = {
  project: { select: { id: true, title: true, clientId: true } },
  freelancer: { select: { id: true, name: true } },
}

async function getMyBids(freelancerId) {
  const bids = await prisma.bid.findMany({
    where: { freelancerId },
    include: bidInclude,
    orderBy: { createdAt: 'desc' },
  })

  return bids.map(formatBid)
}

async function getProjectBids(projectId, clientId) {
  const project = await prisma.project.findUnique({ where: { id: projectId } })

  if (!project) {
    throw new AppError('Project not found', 404)
  }

  if (project.clientId !== clientId) {
    throw new AppError('Not authorized to view bids for this project', 403)
  }

  const bids = await prisma.bid.findMany({
    where: { projectId },
    include: bidInclude,
    orderBy: { createdAt: 'desc' },
  })

  return bids.map(formatBid)
}

async function createBid(freelancerId, data) {
  const { projectId, amount, proposal } = data

  if (!projectId || !amount || !proposal) {
    throw new AppError('Project ID, amount, and proposal are required', 400)
  }

  const project = await prisma.project.findUnique({ where: { id: projectId } })

  if (!project) {
    throw new AppError('Project not found', 404)
  }

  if (project.status !== 'OPEN') {
    throw new AppError('Project is not open for bids', 400)
  }

  if (project.clientId === freelancerId) {
    throw new AppError('Cannot bid on your own project', 400)
  }

  const existing = await prisma.bid.findUnique({
    where: { projectId_freelancerId: { projectId, freelancerId } },
  })

  if (existing) {
    throw new AppError('You have already submitted a bid for this project', 409)
  }

  const bid = await prisma.bid.create({
    data: {
      projectId,
      freelancerId,
      amount: Number(amount),
      proposal,
    },
    include: bidInclude,
  })

  return formatBid(bid)
}

async function acceptBid(bidId, clientId) {
  const bid = await prisma.bid.findUnique({
    where: { id: bidId },
    include: { project: true, ...bidInclude },
  })

  if (!bid) {
    throw new AppError('Bid not found', 404)
  }

  if (bid.project.clientId !== clientId) {
    throw new AppError('Not authorized to accept this bid', 403)
  }

  if (bid.status !== 'PENDING') {
    throw new AppError('Bid is no longer pending', 400)
  }

  const [updatedBid] = await prisma.$transaction([
    prisma.bid.update({
      where: { id: bidId },
      data: { status: 'ACCEPTED' },
      include: bidInclude,
    }),
    prisma.bid.updateMany({
      where: { projectId: bid.projectId, id: { not: bidId }, status: 'PENDING' },
      data: { status: 'REJECTED' },
    }),
    prisma.project.update({
      where: { id: bid.projectId },
      data: { status: 'IN_PROGRESS' },
    }),
  ])

  return formatBid(updatedBid)
}

async function rejectBid(bidId, clientId) {
  const bid = await prisma.bid.findUnique({
    where: { id: bidId },
    include: { project: true, ...bidInclude },
  })

  if (!bid) {
    throw new AppError('Bid not found', 404)
  }

  if (bid.project.clientId !== clientId) {
    throw new AppError('Not authorized to reject this bid', 403)
  }

  if (bid.status !== 'PENDING') {
    throw new AppError('Bid is no longer pending', 400)
  }

  const updated = await prisma.bid.update({
    where: { id: bidId },
    data: { status: 'REJECTED' },
    include: bidInclude,
  })

  return formatBid(updated)
}

async function withdrawBid(bidId, freelancerId) {
  const bid = await prisma.bid.findUnique({ where: { id: bidId } })

  if (!bid) {
    throw new AppError('Bid not found', 404)
  }

  if (bid.freelancerId !== freelancerId) {
    throw new AppError('Not authorized to withdraw this bid', 403)
  }

  if (bid.status !== 'PENDING') {
    throw new AppError('Only pending bids can be withdrawn', 400)
  }

  await prisma.bid.delete({ where: { id: bidId } })

  return { message: 'Bid withdrawn successfully' }
}

module.exports = {
  getMyBids,
  getProjectBids,
  createBid,
  acceptBid,
  rejectBid,
  withdrawBid,
}
