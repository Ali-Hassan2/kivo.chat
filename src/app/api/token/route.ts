import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

async function GET(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })
  if (!token) {
    return NextResponse.json(
      { success: false, message: 'No token found' },
      { status: 401 },
    )
  }

  return NextResponse.json({ success: true, token })
}

export { GET }
