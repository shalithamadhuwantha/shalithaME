import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/api/settings/prisma'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()
    if (!email) return NextResponse.json({ access: false }, { status: 400 })

    const userRecord = await prisma.admin.findFirst({
      where: { email },
    })

    if (!userRecord) return NextResponse.json({ access: false }, { status: 404 })

    return NextResponse.json({ access: userRecord.access })
  } catch (error) {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
