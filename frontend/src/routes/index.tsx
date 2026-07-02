import { createBrowserRouter, Navigate } from 'react-router-dom'


import PublicLayout from '@/components/layout/PublicLayout'
import DashboardLayout from '@/components/layout/DashboardLayout'

import {
  clientNavItems,
  freelancerNavItems,
  adminNavItems,
} from '@/config/navigation'

// ---------------- PUBLIC ----------------
import LandingPage from '@/pages/public/LandingPage'
import LoginPage from '@/pages/public/LoginPage'
import RegisterPage from '@/pages/public/RegisterPage'

// ---------------- CLIENT ----------------
import ClientDashboard from '@/pages/client/ClientDashboard'
import CreateProject from '@/pages/client/CreateProject'
import EditProject from '@/pages/client/EditProject'
import MyProjects from '@/pages/client/MyProjects'
import ProjectDetails from '@/pages/client/ProjectDetails'

// ---------------- FREELANCER ----------------
import FreelancerDashboard from '@/pages/freelancer/FreelancerDashboard'
import BrowseProjects from '@/pages/freelancer/BrowseProjects'
import MyBids from '@/pages/freelancer/MyBids'
import Profile from '@/pages/freelancer/Profile'

// ---------------- ADMIN ----------------
import AdminDashboard from '@/pages/admin/AdminDashboard'

export const router = createBrowserRouter([
  // ================= PUBLIC =================
  {
    element: <PublicLayout />,
    children: [
      {
        path: '/',
        element: <LandingPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },
    ],
  },

  // ================= CLIENT =================
  {
    path: '/client',
    element: (
      <DashboardLayout
        navItems={clientNavItems}
        title="Client Portal"
      />
    ),
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" replace />,
      },

      {
        path: 'dashboard',
        element: <ClientDashboard />,
      },

      {
        path: 'projects',
        element: <MyProjects />,
      },

      {
        path: 'projects/create',
        element: <CreateProject />,
      },

      {
        path: 'projects/:id',
        element: <ProjectDetails />,
      },

      {
        path: 'projects/edit/:id',
        element: <EditProject />,
      },
    ],
  },

  // ================= FREELANCER =================
{
  path: '/freelancer',
  element: (
    <DashboardLayout
      navItems={freelancerNavItems}
      title="Freelancer Portal"
    />
  ),
  children: [
    {
      index: true,
      element: <Navigate to="dashboard" replace />,
    },

    {
      path: 'dashboard',
      element: <FreelancerDashboard />,
    },

    {
      path: 'projects',
      element: <BrowseProjects />,
    },

    // ✅ FIX: THIS WAS MISSING / BROKEN BEFORE
    {
      path: 'projects/:id',
      element: <ProjectDetails />,
    },

    {
      path: 'bids',
      element: <MyBids />,
    },

    {
      path: 'profile',
      element: <Profile />,
    },
  ],
},
  // ================= ADMIN =================
  {
    path: '/admin',
    element: (
      <DashboardLayout
        navItems={adminNavItems}
        title="Admin Portal"
      />
    ),
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" replace />,
      },

      {
        path: 'dashboard',
        element: <AdminDashboard />,
      },
    ],
  },

  // ================= 404 =================
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
])