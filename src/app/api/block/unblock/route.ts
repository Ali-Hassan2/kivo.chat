import { NextResponse } from 'next/server'
import { Types } from 'mongoose'
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
      UserModel.findOne({ username: parseResult.data }),
    ])
    const isSame =
      uid?.toString() === (unblocked?._id as Types.ObjectId).toString()
    if (isSame) {
      return NextResponse.json(
        {
          success: false,
          message: 'Cannot Unblock yourself',
        },
        {
          status: 400,
        },
      )
    }
    if (!user || !unblocked) {
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
    const isBlocked = user.blocks.some(
      (blk) =>
        blk._id.toString() === (unblocked._id as Types.ObjectId).toString(),
    )
    if (!isBlocked) {
      return NextResponse.json(
        {
          success: false,
          message: 'User not blocked',
        },
        {
          status: 400,
        },
      )
    }
    // const isFriend = user.friends.some(
    //   (frnd) =>
    //     frnd.toString() === (unblocked._id as Types.ObjectId).toString(),
    // )
    // if (isFriend) {
    //   return NextResponse.json({
    //     success: false,
    //     message: 'Cannot unblock your friend',
    //   })
    // }
    user.blocks = user.blocks.filter(
      (fb) =>
        fb._id.toString() !== (unblocked._id as Types.ObjectId).toString(),
    )
    await user.save()

    return NextResponse.json(
      {
        success: true,
        message: 'User unblocked',
        username: unblocked.username,
      },
      {
        status: 200,
      },
    )
  } catch (error: unknown) {
    let errorMessage = 'unknown error'
    if (error instanceof Error) {
      errorMessage = error?.message
    } else if (typeof error === 'string') {
      errorMessage = error
    }
    return NextResponse.json(
      {
        success: false,
        message: 'Server Error',
      },
      {
        status: 500,
      },
    )
  }
}

export { POST }
