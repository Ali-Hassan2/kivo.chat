import { NextResponse } from 'next/server'
import { Types } from 'mongoose'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { UserModel } from '@/entities'
import { connect_db } from '@/settings'
import { authOptions } from '../../auth/[...nextauth]/options'

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
    await connect_db()
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
    const [user, blocked] = await Promise.all([
      UserModel.findById(uid),
      UserModel.findOne({ username: parseResult.data }),
    ])
    if (!user || !blocked) {
      return NextResponse.json(
        {
          success: false,
          message: 'Instances for Users not found.',
        },
        {
          status: 400,
        },
      )
    }
    const isFriend = user.friends.some(
      (frnd) => frnd.toString() === (blocked._id as Types.ObjectId).toString(),
    )
    if (isFriend) {
      user.friends.filter(
        (frnd) =>
          frnd._id.toString() !== (blocked._id as Types.ObjectId).toString(),
      )
    }
    const target_id = blocked._id
    if (target_id === uid) {
      return NextResponse.json(
        {
          success: false,
          message: 'You cannot Block Yourself',
        },
        {
          status: 400,
        },
      )
    }
    const isAlreadyBlocked = user.blocks.some(
      (blocking) =>
        blocking.toString() === (target_id as Types.ObjectId).toString(),
    )
    if (isAlreadyBlocked) {
      return NextResponse.json(
        {
          success: false,
          message: 'Already Blocked',
        },
        { status: 400 },
      )
    }
    user.blocks.push(target_id as Types.ObjectId)
    await user.save()

    return NextResponse.json(
      {
        success: true,
        message: 'Got Blocked',
      },
      {
        status: 200,
      },
    )
  } catch (error: unknown) {
    let errorMessage = 'unknown Error'
    if (error instanceof Error) {
      errorMessage = error?.message
    } else if (typeof error === 'string') {
      errorMessage = error
    }
    return NextResponse.json(
      {
        success: false,
        message: 'Internal Server Error',
        error: errorMessage,
      },
      {
        status: 500,
      },
    )
  }
}

export { POST }
