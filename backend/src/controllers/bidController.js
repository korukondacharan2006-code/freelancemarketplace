const prisma = require('../utils/prisma')
const { success, AppError } = require('../utils/response')

// ================= CREATE BID =================
async function createBid(req, res, next) {
  try {
    const { projectId, amount, proposal } = req.body

    if (!projectId || !amount || !proposal) {
      throw new AppError('Project ID, amount and proposal are required', 400)
    }

    const project = await prisma.project.findUnique({
      where: { id: projectId },
    })

    if (!project) {
      throw new AppError('Project not found', 404)
    }

    if (project.status !== 'OPEN') {
      throw new AppError('Project is not open for bidding', 400)
    }

    if (project.clientId === req.user.id) {
      throw new AppError('You cannot bid on your own project', 400)
    }

    const existingBid = await prisma.bid.findFirst({
      where: {
        projectId,
        freelancerId: req.user.id,
      },
    })

    if (existingBid) {
      throw new AppError('You already placed a bid', 400)
    }

    const bid = await prisma.bid.create({
      data: {
        projectId,
        freelancerId: req.user.id,
        amount: Number(amount),
        proposal,
      },
    })

    return success(res, bid)

  } catch (err) {
    console.log(err)
    next(err)
  }
}

// ================= MY BIDS =================
async function getMyBids(req, res, next) {
  try {
    const bids = await prisma.bid.findMany({
      where: {
        freelancerId: req.user.id,
      },
      include: {
        project: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return success(res, bids)

  } catch (err) {
    next(err)
  }
}

// ================= CLIENT PROJECT BIDS =================
async function getProjectBidsForClient(req, res, next) {
  try {
    const { projectId } = req.params

    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
    })

    if (!project) {
      throw new AppError('Project not found', 404)
    }

    if (project.clientId !== req.user.id) {
      throw new AppError('Not authorized', 403)
    }

    const bids = await prisma.bid.findMany({
      where: {
        projectId,
      },
      include: {
        freelancer: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return success(res, bids)

  } catch (err) {
    next(err)
  }
}

// ================= FREELANCER PROJECT BID =================
async function getProjectBidsForFreelancer(req, res, next) {
  try {
    const { projectId } = req.params

    const bids = await prisma.bid.findMany({
      where: {
        projectId,
        freelancerId: req.user.id,
      },
    })

    return success(res, bids)

  } catch (err) {
    next(err)
  }
}

// ================= ACCEPT BID =================
async function acceptBid(req, res, next) {
  try {
    const { id } = req.params

    const bid = await prisma.bid.findUnique({
      where: {
        id,
      },
      include: {
        project: true,
      },
    })

    if (!bid) {
      throw new AppError('Bid not found', 404)
    }

    if (bid.project.clientId !== req.user.id) {
      throw new AppError('Not authorized', 403)
    }

    if (bid.status !== 'PENDING') {
      throw new AppError('Bid already processed', 400)
    }

    await prisma.bid.updateMany({
      where: {
        projectId: bid.projectId,
        status: 'PENDING',
      },
      data: {
        status: 'REJECTED',
      },
    })

    const updated = await prisma.bid.update({
      where: {
        id,
      },
      data: {
        status: 'ACCEPTED',
      },
    })

    await prisma.project.update({
      where: {
        id: bid.projectId,
      },
      data: {
        status: 'IN_PROGRESS',
      },
    })

    return success(res, updated)

  } catch (err) {
    next(err)
  }
}

// ================= REJECT BID =================
async function rejectBid(req, res, next) {
  try {
    const { id } = req.params

    const bid = await prisma.bid.findUnique({
      where: {
        id,
      },
      include: {
        project: true,
      },
    })

    if (!bid) {
      throw new AppError('Bid not found', 404)
    }

    if (bid.project.clientId !== req.user.id) {
      throw new AppError('Not authorized', 403)
    }

    if (bid.status !== 'PENDING') {
      throw new AppError('Bid already processed', 400)
    }

    const updated = await prisma.bid.update({
      where: {
        id,
      },
      data: {
        status: 'REJECTED',
      },
    })

    return success(res, updated)

  } catch (err) {
    next(err)
  }
}

// ================= WITHDRAW BID =================
async function withdrawBid(req, res, next) {
  try {
    const { id } = req.params

    const bid = await prisma.bid.findUnique({
      where: {
        id,
      },
    })

    if (!bid) {
      throw new AppError('Bid not found', 404)
    }

    if (bid.freelancerId !== req.user.id) {
      throw new AppError('Not authorized', 403)
    }

    if (bid.status !== 'PENDING') {
      throw new AppError('Only pending bids can be withdrawn', 400)
    }

    await prisma.bid.delete({
      where: {
        id,
      },
    })

    return success(res, {
      message: 'Bid withdrawn successfully',
    })

  } catch (err) {
    next(err)
  }
}

module.exports = {
  createBid,
  getMyBids,
  getProjectBidsForClient,
  getProjectBidsForFreelancer,
  acceptBid,
  rejectBid,
  withdrawBid,
}