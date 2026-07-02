import api from './client'
import type { User } from '@/types'

export async function getProfile(): Promise<User> {
  const response = await api.get('/users/profile')
  return response.data.data
}

export async function updateProfile(data: Partial<User>): Promise<User> {
  const response = await api.patch('/users/profile', data)
  return response.data.data
}