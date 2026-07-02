import type { Bid } from '@/types'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'

export interface BidCardProps {
  bid: Bid
  view?: 'client' | 'freelancer'
  showProposal?: boolean
  onAccept?: () => void
  onDecline?: () => void
  onWithdraw?: () => void
  pendingAction?: 'accept' | 'reject' | 'withdraw' | null
  className?: string
}

export default function BidCard({
  bid,
  view = 'freelancer',
  showProposal = true,
  onAccept,
  onDecline,
  onWithdraw,
  pendingAction = null,
  className = '',
}: BidCardProps) {
  const showClientActions = view === 'client' && bid.status === 'pending'
  const showWithdraw = view === 'freelancer' && bid.status === 'pending'

  return (
    <Card className={className}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex-1">
          {view === 'freelancer' ? (
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-semibold text-slate-900">{bid.projectTitle}</h3>
              <Badge variant={bid.status}>{bid.status}</Badge>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-100 text-sm font-semibold text-primary-700">
                {bid.freelancerName.charAt(0)}
              </div>
              <div>
                <p className="font-medium text-slate-900">{bid.freelancerName}</p>
                <p className="text-xs text-slate-500">Submitted {bid.createdAt}</p>
              </div>
              <Badge variant={bid.status}>{bid.status}</Badge>
            </div>
          )}

          {showProposal && (
            <p className="mt-3 text-sm leading-relaxed text-slate-600">{bid.proposal}</p>
          )}

          {view === 'freelancer' && (
            <p className="mt-2 text-xs text-slate-500">Submitted on {bid.createdAt}</p>
          )}
        </div>

        <div className="flex flex-col items-end gap-2">
          <p className="text-2xl font-bold text-slate-900">${bid.amount.toLocaleString()}</p>

          {showClientActions && (
            <div className="flex gap-2">
              <Button size="sm" onClick={onAccept} isLoading={pendingAction === 'accept'}>
                Accept
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={onDecline}
                isLoading={pendingAction === 'reject'}
              >
                Decline
              </Button>
            </div>
          )}

          {showWithdraw && (
            <Button
              variant="outline"
              size="sm"
              onClick={onWithdraw}
              isLoading={pendingAction === 'withdraw'}
            >
              Withdraw Bid
            </Button>
          )}
        </div>
      </div>
    </Card>
  )
}
