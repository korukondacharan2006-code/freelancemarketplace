import type { ReactNode } from 'react'

export type UserRole = 'client' | 'freelancer' | 'admin'

export type ProjectStatus = 'open' | 'in_progress' | 'completed' | 'cancelled'

export type BidStatus = 'pending' | 'accepted' | 'rejected'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
  title?: string
  bio?: string
  skills?: string[]
  hourlyRate?: number
  createdAt?: string
}

export interface Project {
  id: string
  title: string
  description: string
  budget: number
  status: ProjectStatus
  category: string
  clientId: string
  clientName: string
  createdAt: string
  deadline?: string
  skills: string[]
  bidsCount: number
}

export interface Bid {
  id: string
  projectId: string
  projectTitle: string
  freelancerId: string
  freelancerName: string
  amount: number
  proposal: string
  status: BidStatus
  createdAt: string
}

export interface DashboardStat {
  label: string
  value: string | number
  change?: string
  trend?: 'up' | 'down' | 'neutral'
}

export interface NavItem {
  label: string
  path: string
  icon: ReactNode
}
