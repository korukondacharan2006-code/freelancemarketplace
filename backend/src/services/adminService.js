const prisma = require('../utils/prisma')

async function getDashboardStats() {
  const [
    totalUsers,
    totalProjects,
    totalBids,
    openProjects,
    recentProjects,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.project.count(),
    prisma.bid.count(),
    prisma.project.count({
      where: {
        status: 'OPEN',
      },
    }),
    prisma.project.findMany({
      take: 5,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        client: {
          select: {
            name: true,
          },
        },
      },
    }),
  ])

  return {
    stats: {
      totalUsers,
      totalProjects,
      totalBids,
      openProjects,
    },
    recentProjects,
  }
}

async function getClientStats(clientId) {
  const [
    totalProjects,
    openProjects,
    inProgressProjects,
    completedProjects,
  ] = await Promise.all([
    prisma.project.count({
      where: {
        clientId,
      },
    }),

    prisma.project.count({
      where: {
        clientId,
        status: 'OPEN',
      },
    }),

    prisma.project.count({
      where: {
        clientId,
        status: 'IN_PROGRESS',
      },
    }),

    prisma.project.count({
      where: {
        clientId,
        status: 'COMPLETED',
      },
    }),
  ])

  return {
    totalProjects,
    openProjects,
    inProgressProjects,
    completedProjects,
  }
}

async function getFreelancerStats(freelancerId) {
  const [
    totalBids,
    pendingBids,
    acceptedBids,
    rejectedBids,
  ] = await Promise.all([
    prisma.bid.count({
      where: {
        freelancerId,
      },
    }),

    prisma.bid.count({
      where: {
        freelancerId,
        status: 'PENDING',
      },
    }),

    prisma.bid.count({
      where: {
        freelancerId,
        status: 'ACCEPTED',
      },
    }),

    prisma.bid.count({
      where: {
        freelancerId,
        status: 'REJECTED',
      },
    }),
  ])

  return {
    totalBids,
    pendingBids,
    acceptedBids,
    rejectedBids,
  }
}

module.exports = {
  getDashboardStats,
  getClientStats,
  getFreelancerStats,
}