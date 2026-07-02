import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import DashboardCard from '@/components/cards/DashboardCard'
import ProjectCard from '@/components/cards/ProjectCard'
import Button from '@/components/ui/Button'

import { getClientDashboard } from '@/api/dashboard'
import { getMyProjects } from '@/api/projects'

import type { DashboardStat, Project } from '@/types'

export default function ClientDashboard() {
  const [stats, setStats] = useState<DashboardStat[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadDashboard() {
      try {
        setLoading(true)
        setError(null)

        const [dashboardData, myProjects] = await Promise.all([
          getClientDashboard(),
          getMyProjects(),
        ])

        setProjects(myProjects)

        setStats([
          {
            label: 'Total Projects',
            value: dashboardData.stats.totalProjects,
          },
          {
            label: 'Open Projects',
            value: dashboardData.stats.openProjects,
          },
          {
            label: 'In Progress',
            value: dashboardData.stats.inProgressProjects,
          },
          {
            label: 'Completed',
            value: dashboardData.stats.completedProjects,
          },
        ])
      } catch (err: any) {
        setError(
          err?.response?.data?.message ||
            err?.message ||
            'Failed to load dashboard.'
        )
      } finally {
        setLoading(false)
      }
    }

    loadDashboard()
  }, [])

  const recentProjects = projects.slice(0, 3)

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Client Dashboard
          </h1>

          <p className="mt-1 text-sm text-slate-600">
            Welcome back! Here's an overview of your projects.
          </p>
        </div>

        <Button to="/client/projects/create">
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>

          New Project
        </Button>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <DashboardCard key={stat.label} stat={stat} />
        ))}
      </div>

      <div className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">
            Recent Projects
          </h2>

          <Link
            to="/client/projects"
            className="text-sm font-medium text-primary-600 hover:text-primary-700"
          >
            View all
          </Link>
        </div>

        <div className="mt-4 space-y-4">
          {loading ? (
            <p className="text-sm text-slate-500">
              Loading projects...
            </p>
          ) : error ? (
            <p className="text-sm text-red-500">
              {error}
            </p>
          ) : recentProjects.length === 0 ? (
            <p className="text-sm text-slate-500">
              You have not created any projects yet.
            </p>
          ) : (
            recentProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                variant="compact"
                detailPath={`/client/projects/${project.id}`}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}