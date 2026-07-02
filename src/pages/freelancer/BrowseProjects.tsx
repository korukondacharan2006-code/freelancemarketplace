import { useEffect, useState } from 'react'
import api from '@/api/client'
import { useNavigate } from 'react-router-dom'

type Project = {
  id: string
  title: string
  description: string
  budget: number
  category: string
  status: string
  createdAt: string
}

export default function BrowseProjects() {
  const navigate = useNavigate()

  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')

  const loadProjects = async () => {
    try {
      setLoading(true)

      const res = await api.get('/projects')
      setProjects(res.data?.data || res.data || [])
    } catch (err) {
      console.log(err)
      alert('Failed to load projects')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProjects()
  }, [])

  const filtered = projects.filter((p) => {
    return (
      p.title.toLowerCase().includes(search.toLowerCase()) &&
      (category ? p.category === category : true)
    )
  })

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-4">
        Browse Projects
      </h1>

      {/* FILTERS */}
      <div className="flex gap-3 mb-4">
        <input
          className="border p-2"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <input
          className="border p-2"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>

      {/* LOADING */}
      {loading && <p>Loading...</p>}

      {/* LIST */}
      <div className="grid gap-4">
        {filtered.map((project) => (
          <div
            key={project.id}
            className="border p-4 rounded"
          >
            <h2 className="font-bold">{project.title}</h2>
            <p>{project.description}</p>
            <p>💰 ₹{project.budget}</p>
            <p>📂 {project.category}</p>

            <button
              className="mt-2 bg-blue-600 text-white px-4 py-1"
              onClick={() =>
                navigate(`/freelancer/projects/${project.id}`)
              }
            >
              View
            </button>
          </div>
        ))}
      </div>

    </div>
  )
}