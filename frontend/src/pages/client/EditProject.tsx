import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '@/api/client'

export default function EditProject() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const [form, setForm] = useState({
    title: '',
    description: '',
    budget: '',
    category: '',
    deadline: '',
    skills: '',
  })

useEffect(() => {
  if (!id) return
  loadProject()
}, [id])

  const loadProject = async () => {
    try {
      const res = await api.get(`/projects/${id}`)

      const project = res.data?.data || res.data

      setForm({
        title: project?.title || '',
        description: project?.description || '',
        budget: project?.budget ? String(project.budget) : '',
        category: project?.category || '',
        deadline: project?.deadline
          ? new Date(project.deadline).toISOString().split('T')[0]
          : '',
        skills: Array.isArray(project?.skills)
          ? project.skills.join(', ')
          : project?.skills || '',
      })
    } catch (err) {
  console.log(err)
  alert('Failed to load project')
  navigate('/client/projects') // 👈 safety redirect
} finally {
      setLoading(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const updateProject = async () => {
    try {
      if (Number(form.budget) <= 0) {
  alert('Budget must be greater than 0')
  return
}

      setSaving(true)

      await api.patch(`/projects/${id}`, {
        title: form.title.trim(),
        description: form.description.trim(),
        budget: Number(form.budget),
        category: form.category,
        deadline: form.deadline || null,
        skills: form.skills
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
      })

      alert('Project updated successfully')
      navigate(`/client/projects/${id}`)
    } catch (err: any) {
      alert(
        err?.response?.data?.message ||
          'Update failed'
      )
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="p-6">Loading...</div>
  }

  return (
    <div className="max-w-3xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        Edit Project
      </h1>

      <input
        className="border p-2 w-full mb-4"
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
      />

      <textarea
        className="border p-2 w-full mb-4"
        name="description"
        rows={6}
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      />

      <input
        className="border p-2 w-full mb-4"
        name="budget"
        type="number"
        placeholder="Budget"
        value={form.budget}
        onChange={handleChange}
      />

      <input
        className="border p-2 w-full mb-4"
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={handleChange}
      />

      <input
        className="border p-2 w-full mb-4"
        type="date"
        name="deadline"
        value={form.deadline}
        onChange={handleChange}
      />

      <input
        className="border p-2 w-full mb-6"
        name="skills"
        placeholder="React, Node, Prisma"
        value={form.skills}
        onChange={handleChange}
      />

      <button
        onClick={updateProject}
        disabled={saving}
        className="px-6 py-2 bg-blue-600 text-white rounded"
      >
        {saving ? 'Updating...' : 'Update Project'}
      </button>

    </div>
  )
}