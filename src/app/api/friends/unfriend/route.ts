import { NextResponse } from 'next/server'
import { Types } from 'mongoose'
import { getServerSession } from 'next-auth'
import { UserModel } from '@/entities'
import { connect_db } from '@/settings'
import { authOptions } from '../../auth/[...nextauth]/options'

async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?._id) {
      return NextResponse.json(
        { success: false, message: 'User is not logged in.' },
        { status: 401 },
      )
    }

    const { searchParams } = new URL(request.url)
    const requestId = searchParams.get('requestId')

    if (!requestId) {
      return NextResponse.json(
        { success: false, message: 'requestId is required.' },
        { status: 400 },
      )
    }
    if (!Types.ObjectId.isValid(requestId)) {
      return NextResponse.json(
        { success: false, message: 'Invalid requestId.' },
        { status: 400 },
      )
    }

    await connect_db()

    const currentUser = await UserModel.findById(session.user._id)
    if (!currentUser) {
      return NextResponse.json(
        { success: false, message: 'Current user not found.' },
        { status: 404 },
      )
    }

    const userToUnfriend = await UserModel.findById(requestId)
    if (!userToUnfriend) {
      return NextResponse.json(
        { success: false, message: 'User does not exist.' },
        { status: 404 },
      )
    }
    const isFriend = currentUser.friends.some(
      (id) => id.toString() === requestId,
    )
    if (!isFriend) {
      return NextResponse.json(
        { success: false, message: 'User is not in your friends list.' },
        { status: 400 },
      )
    }
    currentUser.friends = currentUser.friends.filter(
      (id) => id.toString() !== requestId,
    )
    userToUnfriend.friends = userToUnfriend.friends.filter(
      (id) => id.toString() !== currentUser._id.toString(),
    )
    await currentUser.save()
    await userToUnfriend.save()

    return NextResponse.json(
      { success: true, message: 'Unfriended successfully.' },
      { status: 200 },
    )
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Server error.'

    return NextResponse.json({ success: false, message }, { status: 500 })
  }
}

export { POST }
