import type { DashboardStat } from '@/types'
import Card from '@/components/ui/Card'

export interface DashboardCardProps extends Partial<DashboardStat> {
  stat?: DashboardStat
  label?: string
  value?: string | number
  change?: string
  trend?: DashboardStat['trend']
  icon?: React.ReactNode
  className?: string
}

export default function DashboardCard({
  stat,
  label,
  value,
  change,
  trend,
  icon,
  className = '',
}: DashboardCardProps) {
  const resolvedLabel = stat?.label ?? label ?? ''
  const resolvedValue = stat?.value ?? value ?? ''
  const resolvedChange = stat?.change ?? change
  const resolvedTrend = stat?.trend ?? trend

  const trendColor =
    resolvedTrend === 'up'
      ? 'text-emerald-600'
      : resolvedTrend === 'down'
        ? 'text-red-600'
        : 'text-slate-500'

  return (
    <Card className={className}>
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium text-slate-500">{resolvedLabel}</p>
        {icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
            {icon}
          </div>
        )}
      </div>
      <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">{resolvedValue}</p>
      {resolvedChange && (
        <p className={`mt-1 text-sm ${trendColor}`}>{resolvedChange}</p>
      )}
    </Card>
  )
}
