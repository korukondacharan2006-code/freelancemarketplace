const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  const password = await bcrypt.hash('password123', 12)

  const client = await prisma.user.upsert({
    where: { email: 'client@example.com' },
    update: {},
    create: {
      name: 'Acme Retail Co.',
      email: 'client@example.com',
      password,
      role: 'CLIENT',
    },
  })

  const freelancer = await prisma.user.upsert({
    where: { email: 'alex@example.com' },
    update: {},
    create: {
      name: 'Alex Rivera',
      email: 'alex@example.com',
      password,
      role: 'FREELANCER',
      title: 'Full-Stack Developer & UI Designer',
      bio: 'Passionate developer with 6 years of experience building web and mobile applications.',
      skills: ['React', 'TypeScript', 'Node.js', 'Figma', 'Tailwind CSS', 'PostgreSQL'],
      hourlyRate: 65,
    },
  })

  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@example.com',
      password,
      role: 'ADMIN',
    },
  })

  const project1 = await prisma.project.upsert({
    where: { id: 'seed-project-1' },
    update: {},
    create: {
      id: 'seed-project-1',
      title: 'E-commerce Website Redesign',
      description:
        'Looking for an experienced frontend developer to redesign our Shopify store with a modern, mobile-first approach.',
      budget: 4500,
      status: 'OPEN',
      category: 'Web Development',
      clientId: client.id,
      deadline: new Date('2026-07-15'),
      skills: ['React', 'Tailwind CSS', 'Shopify'],
    },
  })

  await prisma.project.upsert({
    where: { id: 'seed-project-2' },
    update: {},
    create: {
      id: 'seed-project-2',
      title: 'Mobile App UI/UX Design',
      description: 'Need a talented designer to create wireframes and high-fidelity mockups for a fitness tracking mobile app.',
      budget: 2800,
      status: 'OPEN',
      category: 'Design',
      clientId: client.id,
      deadline: new Date('2026-07-01'),
      skills: ['Figma', 'UI/UX', 'Mobile Design'],
    },
  })

  await prisma.bid.upsert({
    where: { projectId_freelancerId: { projectId: project1.id, freelancerId: freelancer.id } },
    update: {},
    create: {
      projectId: project1.id,
      freelancerId: freelancer.id,
      amount: 4200,
      proposal:
        'I have 5+ years of experience building e-commerce sites with React and Shopify. I can deliver within 4 weeks.',
      status: 'PENDING',
    },
  })

  console.log('Seed completed.')
  console.log('Test accounts (password: password123):')
  console.log('  Client:     client@example.com')
  console.log('  Freelancer: alex@example.com')
  console.log('  Admin:      admin@example.com')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
