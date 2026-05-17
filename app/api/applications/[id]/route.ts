import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendApplicationAccepted, sendApplicationRejected } from '@/lib/email'

interface RouteParams {
  params: Promise<{
    id: string
  }>
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action')
    const { id } = await params

    if (!id) {
      return NextResponse.json({ error: 'Application ID required' }, { status: 400 })
    }

    const application = await prisma.application.findUnique({
      where: { id },
    })

    if (!application) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 })
    }

    if (action === 'accept') {
      const updated = await prisma.application.update({
        where: { id },
        data: {
          status: 'accepted',
          reviewedAt: new Date(),
        },
      })

      await sendApplicationAccepted(application.userEmail, application.userName)

      return NextResponse.json(updated)
    } else if (action === 'reject') {
      const updated = await prisma.application.update({
        where: { id },
        data: {
          status: 'rejected',
          reviewedAt: new Date(),
        },
      })

      await sendApplicationRejected(application.userEmail, application.userName)

      return NextResponse.json(updated)
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error('Error updating application:', error)
    return NextResponse.json(
      { error: 'Failed to update application' },
      { status: 500 }
    )
  }
}