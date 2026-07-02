const { Router } = require('express')
const bidController = require('../controllers/bidController')
const { authenticate, authorize } = require('../middleware/auth')

const router = Router()

router.use(authenticate)


// ================= FREELANCER =================

// create bid
router.post(
  '/',
  authorize('FREELANCER'),
  bidController.createBid
)

// my bids (freelancer only)
router.get(
  '/my',
  authorize('FREELANCER'),
  bidController.getMyBids
)

// freelancer sees bids only for his view (optional safety)
router.get(
  '/project/:projectId',
  authorize('FREELANCER'),
  bidController.getProjectBidsForFreelancer
)

router.delete(
  '/:id',
  authorize('FREELANCER'),
  bidController.withdrawBid
)


// ================= CLIENT =================

// client sees ALL bids of project
router.get(
  '/project/:projectId/client',
  authorize('CLIENT'),
  bidController.getProjectBidsForClient
)

router.patch(
  '/:id/accept',
  authorize('CLIENT'),
  bidController.acceptBid
)

router.patch(
  '/:id/reject',
  authorize('CLIENT'),
  bidController.rejectBid
)

module.exports = router