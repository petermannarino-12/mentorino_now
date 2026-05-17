import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendApplicationAccepted, sendApplicationRejected } from '@/lib/email'

// PUT /api/applications/[id]/accept
export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action')
    const id = request.url.split('/api/applications/')[1]?.split('/')[0]

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
      // Update application status
      const updated = await prisma.application.update({
        where: { id },
        data: {
          status: 'accepted',
          reviewedAt: new Date(),
        },
      })

      // Send acceptance email
      await sendApplicationAccepted(application.userEmail, application.userName)

      return NextResponse.json(updated)
    } else if (action === 'reject') {
      // Update application status
      const updated = await prisma.application.update({
        where: { id },
        data: {
          status: 'rejected',
          reviewedAt: new Date(),
        },
      })

      // Send rejection email
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