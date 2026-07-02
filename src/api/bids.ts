import api from './client'
import type { Bid } from '@/types'

export async function getMyBids(): Promise<Bid[]> {
  const response = await api.get('/bids/my')
  return response.data.data
}

export async function getProjectBids(projectId: string): Promise<Bid[]> {
  const response = await api.get(`/bids/project/${projectId}`)
  return response.data.data
}

export async function createBid(data: {
  projectId: string
  amount: number
  proposal: string
}): Promise<Bid> {
  const response = await api.post('/bids', data)
  return response.data.data
}

export async function acceptBid(id: string): Promise<Bid> {
  const response = await api.patch(`/bids/${id}/accept`)
  return response.data.data
}

export async function rejectBid(id: string): Promise<Bid> {
  const response = await api.patch(`/bids/${id}/reject`)
  return response.data.data
}

export async function withdrawBid(id: string) {
  const response = await api.delete(`/bids/${id}`)
  return response.data.data
}