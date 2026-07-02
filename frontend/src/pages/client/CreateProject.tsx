import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '@/api/client'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Select from '@/components/ui/Select'
import Card from '@/components/ui/Card'
import { useToast } from '@/components/ui/Toast'
import { categories } from '@/data/mock'

export default function CreateProject() {
  const navigate = useNavigate()
  const { success, error } = useToast()
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    title: '',
    description: '',
    category: categories[0],
    budget: '',
    deadline: '',
    skills: '',
  })

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)

    try {
      const payload = {
        title: form.title.trim(),
        description: form.description.trim(),
        category: form.category,
        budget: form.budget ? Number(form.budget) : 0,
        deadline: form.deadline || null,
        skills: form.skills
          ? form.skills.split(',').map((s) => s.trim()).filter(Boolean)
          : [],
      }

      await api.post('/projects', payload)

      success('Project created successfully')
      navigate('/client/projects')
    } catch (err: any) {
      error(
        err?.response?.data?.message ||
          err?.message ||
          'Failed to create project',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-bold">Create Project</h1>

      <Card className="mt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="title"
            label="Title"
            value={form.title}
            onChange={handleChange}
            required
          />

          <Textarea
            name="description"
            label="Description"
            value={form.description}
            onChange={handleChange}
            required
          />

          <Select
            name="category"
            label="Category"
            value={form.category}
            onChange={handleChange}
            options={categories.map((c) => ({ value: c, label: c }))}
          />

          <Input
            name="budget"
            label="Budget"
            type="number"
            value={form.budget}
            onChange={handleChange}
            required
          />

          <Input
            name="deadline"
            label="Deadline"
            type="date"
            value={form.deadline}
            onChange={handleChange}
          />

          <Input
            name="skills"
            label="Skills (comma separated)"
            value={form.skills}
            onChange={handleChange}
          />

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => navigate(-1)}>
              Cancel
            </Button>

            <Button type="submit" isLoading={loading}>
              Publish
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}