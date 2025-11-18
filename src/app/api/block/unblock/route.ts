import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { UserModel } from '@/entities'
import { connect_db } from '@/settings'
import { authOptions } from '../../auth/[...nextauth]/options'

const usernameQuerySchema = z.string().min(3, {
  message: 'Username must be 3 characters long',
})
async function POST(request: Request) {
  try {
    if (request.method !== 'POST') {
      return NextResponse.json(
        {
          success: false,
          message: 'Method not allowed',
        },
        {
          status: 405,
        },
      )
    }
    const session = await getServerSession(authOptions)
    if (!session?.user?.username) {
      return NextResponse.json(
        {
          success: false,
          message: 'Session not found',
        },
        {
          status: 400,
        },
      )
    }
    await connect_db()
    const { searchParams } = new URL(request.url)
    const rawUsername = searchParams.get('username') || ''
    const decodedUsername = decodeURIComponent(rawUsername)
    const parseResult = usernameQuerySchema.safeParse(decodedUsername)
    if (!parseResult.success) {
      return NextResponse.json({
        success: false,
        message: 'validation failed',
        errors: parseResult.error?.issues.map((err) => err?.message),
      })
    }

    const uid = session?.user?._id
    const [user, unblocked] = await Promise.all([
      UserModel.findById(uid),
      UserModel.findOne({ username: username }),
    ])
    if (!user || unblocked) {
      return NextResponse.json(
        {
          success: false,
          message: 'Instances not found',
        },
        {
          status: 400,
        },
      )
    }
  } catch (error) {}
}
