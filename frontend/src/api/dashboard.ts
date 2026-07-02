import api from './client'

export interface ClientDashboardResponse {
  stats: {
    totalProjects: number
    openProjects: number
    inProgressProjects: number
    completedProjects: number
  }
}

export interface FreelancerDashboardResponse {
  stats: {
    totalBids: number
    pendingBids: number
    acceptedBids: number
    rejectedBids: number
  }
}

export interface AdminDashboardResponse {
  stats: {
    totalUsers: number
    totalProjects: number
    totalBids: number
    openProjects: number
  }
  recentProjects: unknown[]
}

export async function getClientDashboard(): Promise<ClientDashboardResponse> {
  const response = await api.get('/dashboard/client')
  return response.data.data
}

export async function getFreelancerDashboard(): Promise<FreelancerDashboardResponse> {
  const response = await api.get('/dashboard/freelancer')
  return response.data.data
}

export async function getAdminDashboard(): Promise<AdminDashboardResponse> {
  const response = await api.get('/dashboard/admin')
  return response.data.data
}