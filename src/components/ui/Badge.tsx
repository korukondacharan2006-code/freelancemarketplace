import type { ProjectStatus, BidStatus } from '@/types'

type BadgeVariant = 'default' | ProjectStatus | BidStatus | 'category'

const variantClasses: Record<string, string> = {
  default: 'bg-slate-100 text-slate-700',
  open: 'bg-emerald-100 text-emerald-800',
  in_progress: 'bg-blue-100 text-blue-800',
  completed: 'bg-slate-100 text-slate-600',
  cancelled: 'bg-red-100 text-red-800',
  pending: 'bg-amber-100 text-amber-800',
  accepted: 'bg-emerald-100 text-emerald-800',
  rejected: 'bg-red-100 text-red-800',
  category: 'bg-primary-50 text-primary-700',
}

interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  className?: string
}

export default function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const label = typeof children === 'string' ? children.replace(/_/g, ' ') : children

  return (
    <span
      className={[
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize',
        variantClasses[variant] ?? variantClasses.default,
        className,
      ].join(' ')}
    >
      {label}
    </span>
  )
}
