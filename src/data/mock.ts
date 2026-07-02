import type { Bid, Project, User } from '@/types'

export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'E-commerce Website Redesign',
    description:
      'Looking for an experienced frontend developer to redesign our Shopify store with a modern, mobile-first approach. Must have experience with React and Tailwind CSS.',
    budget: 4500,
    status: 'open',
    category: 'Web Development',
    clientId: 'c1',
    clientName: 'Acme Retail Co.',
    createdAt: '2026-06-10',
    deadline: '2026-07-15',
    skills: ['React', 'Tailwind CSS', 'Shopify'],
    bidsCount: 12,
  },
  {
    id: '2',
    title: 'Mobile App UI/UX Design',
    description:
      'Need a talented designer to create wireframes and high-fidelity mockups for a fitness tracking mobile app. Figma proficiency required.',
    budget: 2800,
    status: 'open',
    category: 'Design',
    clientId: 'c2',
    clientName: 'FitLife Inc.',
    createdAt: '2026-06-12',
    deadline: '2026-07-01',
    skills: ['Figma', 'UI/UX', 'Mobile Design'],
    bidsCount: 8,
  },
  {
    id: '3',
    title: 'API Integration for CRM',
    description:
      'Integrate our custom CRM with Salesforce and HubSpot APIs. Experience with OAuth 2.0 and webhook handling is essential.',
    budget: 6200,
    status: 'in_progress',
    category: 'Backend',
    clientId: 'c1',
    clientName: 'Acme Retail Co.',
    createdAt: '2026-05-20',
    deadline: '2026-06-30',
    skills: ['Node.js', 'REST API', 'Salesforce'],
    bidsCount: 5,
  },
  {
    id: '4',
    title: 'Content Writing — Tech Blog',
    description:
      'Seeking a technical writer to produce 8 SEO-optimized blog posts about cloud infrastructure and DevOps best practices.',
    budget: 1200,
    status: 'completed',
    category: 'Writing',
    clientId: 'c3',
    clientName: 'CloudScale Media',
    createdAt: '2026-04-01',
    skills: ['Technical Writing', 'SEO', 'DevOps'],
    bidsCount: 15,
  },
  {
    id: '5',
    title: 'Logo & Brand Identity Package',
    description:
      'Startup looking for a complete brand identity including logo, color palette, typography, and brand guidelines document.',
    budget: 1500,
    status: 'open',
    category: 'Branding',
    clientId: 'c4',
    clientName: 'NovaTech Startup',
    createdAt: '2026-06-18',
    deadline: '2026-07-10',
    skills: ['Branding', 'Illustrator', 'Logo Design'],
    bidsCount: 22,
  },
]

export const mockBids: Bid[] = [
  {
    id: 'b1',
    projectId: '1',
    projectTitle: 'E-commerce Website Redesign',
    freelancerId: 'f1',
    freelancerName: 'Alex Rivera',
    amount: 4200,
    proposal:
      'I have 5+ years of experience building e-commerce sites with React and Shopify. I can deliver a pixel-perfect redesign within 4 weeks.',
    status: 'pending',
    createdAt: '2026-06-14',
  },
  {
    id: 'b2',
    projectId: '2',
    projectTitle: 'Mobile App UI/UX Design',
    freelancerId: 'f1',
    freelancerName: 'Alex Rivera',
    amount: 2500,
    proposal:
      'As a UI/UX specialist, I have designed 20+ fitness apps. I will provide wireframes, prototypes, and a complete design system in Figma.',
    status: 'accepted',
    createdAt: '2026-06-13',
  },
  {
    id: 'b3',
    projectId: '5',
    projectTitle: 'Logo & Brand Identity Package',
    freelancerId: 'f1',
    freelancerName: 'Alex Rivera',
    amount: 1350,
    proposal:
      'I specialize in minimalist brand identities for tech startups. Portfolio link included — happy to do a quick discovery call.',
    status: 'pending',
    createdAt: '2026-06-19',
  },
  {
    id: 'b4',
    projectId: '4',
    projectTitle: 'Content Writing — Tech Blog',
    freelancerId: 'f1',
    freelancerName: 'Alex Rivera',
    amount: 1100,
    proposal:
      'Former DevOps engineer turned writer. I can deliver technically accurate, SEO-friendly content on schedule.',
    status: 'rejected',
    createdAt: '2026-04-05',
  },
]

export const mockFreelancer: User = {
  id: 'f1',
  name: 'Alex Rivera',
  email: 'alex@example.com',
  role: 'freelancer',
  title: 'Full-Stack Developer & UI Designer',
  bio: 'Passionate developer with 6 years of experience building web and mobile applications. I specialize in React, Node.js, and modern design systems.',
  skills: ['React', 'TypeScript', 'Node.js', 'Figma', 'Tailwind CSS', 'PostgreSQL'],
  hourlyRate: 65,
}

export const clientStats = [
  { label: 'Active Projects', value: 3, change: '+1 this month', trend: 'up' as const },
  { label: 'Total Spent', value: '$12,400', change: '+8% vs last month', trend: 'up' as const },
  { label: 'Open Bids', value: 24, change: 'Across 3 projects', trend: 'neutral' as const },
  { label: 'Completed', value: 7, change: 'All time', trend: 'neutral' as const },
]

export const freelancerStats = [
  { label: 'Active Bids', value: 2, change: '2 pending review', trend: 'neutral' as const },
  { label: 'Earnings', value: '$8,250', change: '+12% this month', trend: 'up' as const },
  { label: 'Win Rate', value: '68%', change: '+5% vs last quarter', trend: 'up' as const },
  { label: 'Jobs Done', value: 14, change: '4.9 avg rating', trend: 'neutral' as const },
]

export const adminStats = [
  { label: 'Total Users', value: '2,847', change: '+124 this week', trend: 'up' as const },
  { label: 'Active Projects', value: 186, change: '+23 this week', trend: 'up' as const },
  { label: 'Platform Revenue', value: '$48,200', change: '+15% this month', trend: 'up' as const },
  { label: 'Disputes', value: 3, change: '2 resolved today', trend: 'down' as const },
]

export const categories = [
  'Web Development',
  'Mobile Development',
  'Design',
  'Writing',
  'Marketing',
  'Backend',
  'Branding',
  'Data Science',
]
