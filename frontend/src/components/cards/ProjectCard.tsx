import { Link } from 'react-router-dom'
import type { Project } from '@/types'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'

export interface ProjectCardProps {
  project: Project
  variant?: 'default' | 'compact'
  detailPath?: string
  showStatus?: boolean
  showClient?: boolean
  showSkills?: boolean
  actionLabel?: string
  onAction?: () => void
  actionTo?: string
  children?: React.ReactNode
  className?: string
}

export default function ProjectCard({
  project,
  variant = 'default',
  detailPath,
  showStatus = true,
  showClient = false,
  showSkills = true,
  actionLabel,
  onAction,
  actionTo,
  children,
  className = '',
}: ProjectCardProps) {
  const titleContent = detailPath ? (
    <Link to={detailPath} className="font-semibold text-slate-900 hover:text-primary-600">
      {project.title}
    </Link>
  ) : (
    <h3 className="font-semibold text-slate-900">{project.title}</h3>
  )

  if (variant === 'compact') {
    return (
      <Card hover className={className}>
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            {titleContent}
            <p className="mt-1 line-clamp-1 text-sm text-slate-600">{project.description}</p>
            <div className="mt-2 flex gap-3 text-xs text-slate-500">
              <span>${project.budget.toLocaleString()}</span>
              <span>{project.bidsCount} bids</span>
            </div>
          </div>
          <Badge variant="category">{project.category}</Badge>
        </div>
      </Card>
    )
  }

  return (
    <Card hover className={className}>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            {detailPath ? (
              <Link
                to={detailPath}
                className="text-lg font-semibold text-slate-900 hover:text-primary-600"
              >
                {project.title}
              </Link>
            ) : (
              <h3 className="text-lg font-semibold text-slate-900">{project.title}</h3>
            )}
            {showStatus && <Badge variant={project.status}>{project.status}</Badge>}
            <Badge variant="category">{project.category}</Badge>
          </div>

          <p className="mt-2 line-clamp-2 text-sm text-slate-600">{project.description}</p>

          {showSkills && project.skills.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {project.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}

          <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-500">
            <span className="font-medium text-slate-900">
              ${project.budget.toLocaleString()}
            </span>
            <span>{project.bidsCount} bids</span>
            {showClient && <span>by {project.clientName}</span>}
            {project.deadline && <span>Due {project.deadline}</span>}
            <span>Posted {project.createdAt}</span>
          </div>
        </div>

        {(actionLabel || actionTo || onAction) && (
          actionTo ? (
            <Button to={actionTo} variant="outline" size="sm">
              {actionLabel ?? 'View'}
            </Button>
          ) : (
            <Button variant="outline" size="sm" onClick={onAction}>
              {actionLabel ?? 'View'}
            </Button>
          )
        )}
      </div>

      {children}
    </Card>
  )
}
