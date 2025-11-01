import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function GET(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })

  console.log('The tookkkken is:', token)
  if (!token) {
    return NextResponse.json(
      { success: false, message: 'No token found' },
      { status: 401 },
    )
  }

  return NextResponse.json({ success: true, token })
}
