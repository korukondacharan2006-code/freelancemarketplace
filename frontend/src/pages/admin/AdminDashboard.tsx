import { useEffect, useState } from 'react'
import api from '@/api/client'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

export default function AdminDashboard() {
  const [users, setUsers] = useState([])
  const [projects, setProjects] = useState([])

  const load = async () => {
    const [u, p] = await Promise.all([
      api.get('/admin/users'),
      api.get('/admin/projects'),
    ])

    setUsers(u.data)
    setProjects(p.data)
  }

  useEffect(() => {
    load()
  }, [])

  const deleteProject = async (id: string) => {
    await api.delete(`/admin/projects/${id}`)
    load()
  }

  return (
    <div>

      <Card>
        <h2>Users</h2>
        {users.map((u: any) => (
          <p key={u._id}>{u.name}</p>
        ))}
      </Card>

      <Card>
        <h2>Projects</h2>
        {projects.map((p: any) => (
          <div key={p._id}>
            <p>{p.title}</p>
            <Button onClick={() => deleteProject(p._id)}>
              Delete
            </Button>
          </div>
        ))}
      </Card>

    </div>
  )
}