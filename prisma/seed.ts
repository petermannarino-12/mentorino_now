import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Create mentor account
  const mentor = await prisma.user.upsert({
    where: { email: 'petermannarino12@gmail.com' },
    update: {},
    create: {
      email: 'petermannarino12@gmail.com',
      fullName: 'Peter Mannarino',
      role: 'mentor',
      isActive: true,
    },
  })

  console.log('Created mentor:', mentor.email)

  // Create sample pending application for testing
  const sampleApplication = await prisma.application.upsert({
    where: { userEmail: 'test@example.com' },
    update: {},
    create: {
      userName: 'Test User',
      userEmail: 'test@example.com',
      userPhone: '+1234567890',
      mentorType: 'Career Strategist',
      meetingPreference: 'Virtual',
      frequency: 'Weekly',
      goals: 'I want to transition into a tech career and need guidance.',
      seriousness: 8,
      status: 'pending',
    },
  })

  console.log('Created sample application:', sampleApplication.userEmail)

  // Create sample events
  await prisma.networkEvent.upsert({
    where: { id: 'event-1' },
    update: {},
    create: {
      id: 'event-1',
      title: 'Tech Meetup',
      description: 'Networking event for tech professionals',
      date: '2026-07-01',
      time: '18:00',
      location: 'Downtown Conference Center',
      attendees: [],
    },
  })

  await prisma.networkEvent.upsert({
    where: { id: 'event-2' },
    update: {},
    create: {
      id: 'event-2',
      title: 'Career Workshop',
      description: 'Learn how to land your dream job',
      date: '2026-07-15',
      time: '10:00',
      location: 'Online',
      attendees: [],
    },
  })

  console.log('Created sample events')

  console.log('✅ Seeding completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })