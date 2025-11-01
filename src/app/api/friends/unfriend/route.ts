import { NextResponse } from 'next/server'
import { Types } from 'mongoose'
import { getServerSession } from 'next-auth'
import { UserModel } from '@/entities'
import { requestIdSchema } from '@/guards'
import { authOptions } from '../../auth/[...nextauth]/options'

async function POST(request: Request) {
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
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?._id) {
      return NextResponse.json(
        { success: false, message: 'User is not logged in.' },
        { status: 400 },
      )
    }
    const { searchParams } = new URL(request.url)
    const requestId = searchParams.get('requestId') || ''
    const decodedRequestId = decodeURIComponent(requestId)
    const parsedId = requestIdSchema.safeParse(decodedRequestId)
    if (!parsedId.success) {
      return NextResponse.json({
        success: false,
        message: 'requestId validation error',
        error: parsedId.error.issues.map((err) => err.message),
      })
    }
    const userToUnfriend = await UserModel.findById(parsedId.data)
    if (!userToUnfriend) {
      return NextResponse.json(
        { success: false, message: 'User does not exist' },
        { status: 400 },
      )
    }
    const currentUser = await UserModel.findById(session.user._id)
    if (!currentUser) {
      return NextResponse.json(
        { success: false, message: 'Current user not found' },
        { status: 400 },
      )
    }
    const isFriend = currentUser.friends.some(
      (f) => f._id.toString() === parsedId.data,
    )
    if (!isFriend) {
      return NextResponse.json(
        { success: false, message: 'Not a friend' },
        { status: 400 },
      )
    }
    currentUser.friends = currentUser.friends.filter(
      (f) => f._id.toString() !== parsedId.data,
    )
    userToUnfriend.friends = userToUnfriend.friends.filter(
      (f) =>
        f._id.toString() !== (currentUser._id as Types.ObjectId).toString(),
    )
    await currentUser.save()
    await userToUnfriend.save()
    return NextResponse.json(
      { success: true, message: 'Unfriend request completed.' },
      { status: 200 },
    )
  } catch (error: unknown) {
    let errorMessage = 'Unknown Error'
    if (error instanceof Error) errorMessage = error.message
    else if (typeof error === 'string') errorMessage = error

    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 },
    )
  }
}

export { POST }
