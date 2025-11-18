import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { authOptions } from '../../auth/[...nextauth]/options'
import { UserModel } from '@/entities'

const usernameQuerySchema = z
  .string()
  .min(3, { message: 'Username should be 3 chars long,' })
async function POST(request: Request) {
  try {
    if (request.method !== 'POST') {
      return NextResponse.json(
        {
          success: false,
          message: 'Method Not Allowed',
        },
        {
          status: 405,
        },
      )
    }
    const session = await getServerSession(authOptions)
    if (!session?.user?._id) {
      return NextResponse.json(
        {
          success: false,
          message: 'User not found',
        },
        {
          status: 400,
        },
      )
    }

    const uid = session?.user?._id
    const { searchParams } = new URL(request.url)
    const rawUsername = searchParams.get('username') || ''
    const decodedUsername = decodeURIComponent(rawUsername)
    const parseResult = usernameQuerySchema.safeParse(decodedUsername)
    if (!parseResult.success) {
      return NextResponse.json({
        success: false,
        message: 'Validation failed',
        errors: parseResult.error.issues.map((err) => err?.message),
      })
    }
    const user = await UserModel.findById(uid)
    
  } catch (error) {}
}
