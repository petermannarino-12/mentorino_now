import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyWebhookSignature } from '@clerk/nextjs/webhooks'

const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET || ''

export async function POST(request: NextRequest) {
  try {
    const payload = await request.text()
    const signature = request.headers.get('x-clerk-signature') || ''

    let event
    
    if (WEBHOOK_SECRET) {
      event = await verifyWebhookSignature({
        payload,
        signature,
        secret: WEBHOOK_SECRET,
      })
    } else {
      // For development without webhook secret
      event = JSON.parse(payload)
    }

    switch (event.type) {
      case 'user.created':
        const { email_addresses, first_name, last_name, id } = event.data
        const email = email_addresses[0]?.email_address
        const fullName = [first_name, last_name].filter(Boolean).join(' ') || 'User'

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

      case 'user.deleted':
        const deletedUserId = event.data.id
        await prisma.user.updateMany({
          where: { clerkId: deletedUserId },
          data: { isActive: false },
        })
        break
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