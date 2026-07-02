import api from './client'
import type { Project } from '@/types'

export async function getProjects(): Promise<Project[]> {
  const response = await api.get('/projects')
  return response.data.data
}

export async function getMyProjects(): Promise<Project[]> {
  const response = await api.get('/projects/my')
  return response.data.data
}

export async function getProject(id: string): Promise<Project> {
  const response = await api.get(`/projects/${id}`)
  return response.data.data
}

export async function createProject(data: {
  title: string
  description: string
  budget: number
  category: string
  deadline?: string
  skills?: string[]
}): Promise<Project> {
  const response = await api.post('/projects', data)
  return response.data.data
}

export async function updateProject(
  id: string,
  data: Partial<{
    title: string
    description: string
    budget: number
    category: string
    deadline: string
    skills: string[]
    status: string
  }>
): Promise<Project> {
  const response = await api.patch(`/projects/${id}`, data)
  return response.data.data
}

export async function deleteProject(id: string): Promise<void> {
  await api.delete(`/projects/${id}`)
}