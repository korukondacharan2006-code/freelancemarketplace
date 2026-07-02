import type { User } from '@/types'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

export interface ProfileCardProps {
  user: User
  variant?: 'full' | 'compact'
  showEditButton?: boolean
  onEdit?: () => void
  className?: string
}

function Avatar({ name, size = 'lg' }: { name: string; size?: 'sm' | 'lg' }) {
  const sizeClass = size === 'lg' ? 'h-20 w-20 text-2xl' : 'h-10 w-10 text-sm'
  return (
    <div
      className={[
        'flex items-center justify-center rounded-full bg-primary-100 font-bold text-primary-700',
        sizeClass,
      ].join(' ')}
    >
      {name.charAt(0)}
    </div>
  )
}

export default function ProfileCard({
  user,
  variant = 'full',
  showEditButton = false,
  onEdit,
  className = '',
}: ProfileCardProps) {
  if (variant === 'compact') {
    return (
      <Card className={className} padding="sm">
        <div className="flex items-center gap-3">
          <Avatar name={user.name} size="sm" />
          <div className="min-w-0">
            <p className="truncate font-semibold text-slate-900">{user.name}</p>
            {user.title && (
              <p className="truncate text-sm text-slate-500">{user.title}</p>
            )}
          </div>
          {user.hourlyRate && (
            <span className="ml-auto text-sm font-semibold text-primary-600">
              ${user.hourlyRate}/hr
            </span>
          )}
        </div>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
        <Avatar name={user.name} />
        <div className="flex-1 text-center sm:text-left">
          <h2 className="text-xl font-bold text-slate-900">{user.name}</h2>
          {user.title && <p className="text-sm text-slate-500">{user.title}</p>}
          <p className="mt-1 text-sm text-slate-500">{user.email}</p>
          <p className="mt-1 text-sm text-slate-500">Role: {user.role}</p>
          {user.hourlyRate && (
            <p className="mt-2 text-lg font-semibold text-primary-600">
              ${user.hourlyRate}/hr
            </p>
          )}
          {user.createdAt && (
            <p className="mt-1 text-sm text-slate-500">
              Member since {new Date(user.createdAt).toLocaleDateString()}
            </p>
          )}
        </div>
        {showEditButton && onEdit && (
          <Button variant="outline" onClick={onEdit}>
            Edit Profile
          </Button>
        )}
      </div>

      {user.bio && (
        <div className="mt-6 border-t border-slate-100 pt-6">
          <h3 className="text-sm font-semibold text-slate-900">About</h3>
          <p className="mt-2 leading-relaxed text-slate-600">{user.bio}</p>
        </div>
      )}

      {user.skills && user.skills.length > 0 && (
        <div className="mt-6 border-t border-slate-100 pt-6">
          <h3 className="text-sm font-semibold text-slate-900">Skills</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {user.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-lg bg-primary-50 px-3 py-1.5 text-sm font-medium text-primary-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </Card>
  )
}
