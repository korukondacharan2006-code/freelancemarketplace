import { useEffect, useState } from 'react'
import api from '@/api/client'
import BidCard from '@/components/cards/BidCard'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { useToast } from '@/components/ui/Toast'
import type { Bid, BidStatus } from '@/types'

const statusFilters: { value: BidStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'accepted', label: 'Accepted' },
  { value: 'rejected', label: 'Rejected' },
]

export default function MyBids() {
  const { success, error } = useToast()
  const [bids, setBids] = useState<Bid[]>([])
  const [statusFilter, setStatusFilter] = useState<BidStatus | 'all'>('all')
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [withdrawingBidId, setWithdrawingBidId] = useState<string | null>(null)

  const loadBids = async () => {
    setLoading(true)
    setLoadError(null)

    try {
      const response = await api.get('/bids/my')
      const data = response.data?.data ?? response.data
      setBids(Array.isArray(data) ? data : [])
    } catch (err) {
      const apiError = err as {
        response?: { data?: { message?: string } }
        message?: string
      }

      setLoadError(
        apiError.response?.data?.message ||
          apiError.message ||
          'Failed to load your bids.',
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void loadBids()
  }, [])

  const handleWithdrawBid = async (bidId: string) => {
    setWithdrawingBidId(bidId)

    try {
      await api.delete(`/bids/${bidId}`)
      await loadBids()
      success('Bid withdrawn successfully')
    } catch (err) {
      const apiError = err as {
        response?: { data?: { message?: string } }
        message?: string
      }

      error(
        apiError.response?.data?.message ||
          apiError.message ||
          'Failed to withdraw bid. Please try again.',
      )
    } finally {
      setWithdrawingBidId(null)
    }
  }

  const filtered = bids.filter(
    (bid) => statusFilter === 'all' || bid.status === statusFilter,
  )

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold text-slate-900">My Bids</h1>
        <p className="mt-1 text-sm text-slate-600">
          Track the status of all your submitted proposals.
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {statusFilters.map((filter) => (
          <button
            key={filter.value}
            type="button"
            onClick={() => setStatusFilter(filter.value)}
            className={[
              'rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
              statusFilter === filter.value
                ? 'bg-primary-600 text-white'
                : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50',
            ].join(' ')}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-4">
        {loading ? (
          <Card className="text-center">
            <p className="text-slate-600">Loading your bids...</p>
          </Card>
        ) : loadError ? (
          <Card className="text-center">
            <p className="text-slate-600">{loadError}</p>
          </Card>
        ) : filtered.length === 0 ? (
          <Card className="text-center">
            <p className="text-slate-600">No bids found for this filter.</p>
            <Button to="/freelancer/projects" className="mt-4">
              Browse Projects
            </Button>
          </Card>
        ) : (
          filtered.map((bid) => (
            <BidCard
              key={bid.id}
              bid={bid}
              view="freelancer"
              onWithdraw={() => void handleWithdrawBid(bid.id)}
              pendingAction={withdrawingBidId === bid.id ? 'withdraw' : null}
            />
          ))
        )}
      </div>
    </div>
  )
}
