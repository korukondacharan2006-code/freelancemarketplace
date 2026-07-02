import { useEffect, useState } from 'react'
import { getMyProjects } from '@/api/projects'

import ProjectCard from '@/components/cards/ProjectCard'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

import type { Project, ProjectStatus } from '@/types'

const statusFilters: { value: ProjectStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'open', label: 'Open' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
]

export default function MyProjects() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] =
    useState<ProjectStatus | 'all'>('all')

  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadProjects = async () => {
    try {
      setLoading(true)
      setError(null)

      const data = await getMyProjects()
      setProjects(data)
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          'Failed to load projects'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProjects()
  }, [])

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(search.toLowerCase()) ||
      project.description.toLowerCase().includes(search.toLowerCase())

    const matchesStatus =
      statusFilter === 'all' || project.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            My Projects
          </h1>

          <p className="mt-1 text-sm text-slate-600">
            Manage all the projects you have posted.
          </p>
        </div>

        <Button to="/client/projects/create">
          Create Project
        </Button>
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row">
        <Input
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex flex-wrap gap-2">
          {statusFilters.map((filter) => (
            <button
              key={filter.value}
              type="button"
              onClick={() => setStatusFilter(filter.value)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                statusFilter === filter.value
                  ? 'bg-primary-600 text-white'
                  : 'bg-slate-200 hover:bg-slate-300'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 space-y-4">
        {loading ? (
          <Card>
            <p className="text-center text-slate-500">
              Loading projects...
            </p>
          </Card>
        ) : error ? (
          <Card>
            <p className="text-center text-red-600">
              {error}
            </p>
          </Card>
        ) : filteredProjects.length === 0 ? (
          <Card>
            <div className="text-center">
              <h3 className="text-lg font-semibold">
                No Projects Found
              </h3>

              <p className="mt-2 text-slate-500">
                Create your first project to start hiring freelancers.
              </p>

              <div className="mt-5">
                <Button to="/client/projects/create">
                  Create Project
                </Button>
              </div>
            </div>
          </Card>
        ) : (
          filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              detailPath={`/client/projects/${project.id}`}
              actionTo={`/client/projects/${project.id}`}
              actionLabel="View Details"
            />
          ))
        )}
      </div>
    </div>
  )
}