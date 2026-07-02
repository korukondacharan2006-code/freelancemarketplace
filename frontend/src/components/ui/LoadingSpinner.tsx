type SpinnerSize = 'sm' | 'md' | 'lg'

interface LoadingSpinnerProps {
  size?: SpinnerSize
  className?: string
  label?: string
}

const sizeClasses: Record<SpinnerSize, string> = {
  sm: 'h-4 w-4 border-2',
  md: 'h-8 w-8 border-[3px]',
  lg: 'h-12 w-12 border-4',
}

export default function LoadingSpinner({
  size = 'md',
  className = '',
  label = 'Loading',
}: LoadingSpinnerProps) {
  return (
    <div
      role="status"
      aria-label={label}
      className={['inline-flex items-center justify-center', className].join(' ')}
    >
      <div
        className={[
          'animate-spin rounded-full border-current border-t-transparent',
          sizeClasses[size],
        ].join(' ')}
      />
      <span className="sr-only">{label}</span>
    </div>
  )
}

interface LoadingOverlayProps {
  label?: string
  fullScreen?: boolean
}

export function LoadingOverlay({ label = 'Loading...', fullScreen = false }: LoadingOverlayProps) {
  return (
    <div
      className={[
        'flex flex-col items-center justify-center gap-3 bg-white/80',
        fullScreen ? 'fixed inset-0 z-50' : 'absolute inset-0 z-10 rounded-xl',
      ].join(' ')}
    >
      <LoadingSpinner size="lg" className="text-primary-600" />
      <p className="text-sm font-medium text-slate-600">{label}</p>
    </div>
  )
}
