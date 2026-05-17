import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendApplicationSubmitted } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userName, userEmail, userPhone, mentorType, meetingPreference, frequency, goals, seriousness } = body

    // Check if application already exists
    const existing = await prisma.application.findUnique({
      where: { userEmail },
    })

    if (existing) {
      return NextResponse.json(
        { error: 'You have already submitted an application with this email address.' },
        { status: 400 }
      )
    }

    // Create application
    const application = await prisma.application.create({
      data: {
        userName,
        userEmail,
        userPhone,
        mentorType,
        meetingPreference,
        frequency,
        goals,
        seriousness,
        status: 'pending',
      },
    })

    // Send confirmation email
    await sendApplicationSubmitted(userEmail, userName)

    return NextResponse.json(application, { status: 201 })
  } catch (error) {
    console.error('Error creating application:', error)
    return NextResponse.json(
      { error: 'Failed to submit application' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // In production, this would check for mentor authentication
    // For now, we'll allow access but mark as mentor-only in production
    const applications = await prisma.application.findMany({
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(applications)
  } catch (error) {
    console.error('Error fetching applications:', error)
    return NextResponse.json(
      { error: 'Failed to fetch applications' },
      { status: 500 }
    )
  }
}