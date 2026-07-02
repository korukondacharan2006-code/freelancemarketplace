interface CardProps {
  children: React.ReactNode
  className?: string
  padding?: 'sm' | 'md' | 'lg'
  hover?: boolean
}

const paddingClasses = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

export default function Card({
  children,
  className = '',
  padding = 'md',
  hover = false,
}: CardProps) {
  return (
    <div
      className={[
        'rounded-xl border border-slate-200 bg-white shadow-sm',
        paddingClasses[padding],
        hover ? 'transition-shadow hover:shadow-md' : '',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  )
}
