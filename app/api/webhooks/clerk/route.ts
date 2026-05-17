import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    // In production, verify webhook signature with svix
    // For now, parse the payload directly
    const payload = await request.text()
    
    // Skip verification in development
    const event = JSON.parse(payload)

    switch (event.type) {
      case 'user.created': {
        const data = event.data
        const email = data.email_addresses?.[0]?.email_address
        const firstName = data.first_name
        const lastName = data.last_name
        const id = data.id
        const fullName = [firstName, lastName].filter(Boolean).join(' ') || 'User'

        if (email) {
          const application = await prisma.application.findUnique({
            where: { userEmail: email },
          })

          if (application && application.status === 'accepted') {
            await prisma.user.upsert({
              where: { email },
              update: {
                clerkId: id,
                fullName,
              },
              create: {
                email,
                fullName,
                clerkId: id,
                role: 'mentee',
                isActive: true,
                applicationId: application.id,
              },
            })
          }
        }
        break
      }

      case 'user.deleted': {
        const deletedUserId = event.data.id
        await prisma.user.updateMany({
          where: { clerkId: deletedUserId },
          data: { isActive: false },
        })
        break
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}