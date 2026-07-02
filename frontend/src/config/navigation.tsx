import {
  HomeIcon,
  FolderIcon,
  PlusIcon,
  SearchIcon,
  BriefcaseIcon,
  UserIcon,
  ChartIcon,
} from '@/components/icons'
import type { NavItem } from '@/types'

export const clientNavItems: NavItem[] = [
  { label: 'Dashboard', path: '/client/dashboard', icon: <HomeIcon /> },
  { label: 'Create Project', path: '/client/projects/create', icon: <PlusIcon /> },
  { label: 'My Projects', path: '/client/projects', icon: <FolderIcon /> },
]

export const freelancerNavItems: NavItem[] = [
  { label: 'Dashboard', path: '/freelancer/dashboard', icon: <HomeIcon /> },
  { label: 'Browse Projects', path: '/freelancer/projects', icon: <SearchIcon /> },
  { label: 'My Bids', path: '/freelancer/bids', icon: <BriefcaseIcon /> },
  { label: 'Profile', path: '/freelancer/profile', icon: <UserIcon /> },
]

export const adminNavItems: NavItem[] = [
  { label: 'Dashboard', path: '/admin/dashboard', icon: <ChartIcon /> },
]
