import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/users - List all users (mentor only in production)
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        isActive: true,
        applicationId: true,
        createdAt: true,
      },
    })

    return NextResponse.json(users)
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}

// PUT /api/users/[id]/revoke - Revoke user access
export async function PUT(request: NextRequest) {
  try {
    const id = request.url.split('/api/users/')[1]?.split('/')[0]

    if (!id) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    // Update user to inactive
    const updated = await prisma.user.update({
      where: { id },
      data: { isActive: false },
    })

    return NextResponse.json({ success: true, user: updated })
  } catch (error) {
    console.error('Error revoking user:', error)
    return NextResponse.json(
      { error: 'Failed to revoke user access' },
      { status: 500 }
    )
  }
}