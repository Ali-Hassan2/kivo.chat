import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { UserModel } from '@/entities'
import { connect_db } from '@/settings'
import { authOptions } from '../../auth/[...nextauth]/options'

async function GET(request: Request) {
  if (request.method !== 'GET') {
    return NextResponse.json(
      {
        success: false,
        message: 'Method Not Allowed.',
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
        { success: false, message: 'User not logged in.' },
        { status: 400 },
      )
    }
    await connect_db()
    const user = await UserModel.findById(session.user._id).populate({
      path: 'friends',
      select: 'username',
    })
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User does not exist.' },
        { status: 400 },
      )
    }
    const friends = user.friends
    if (friends.length === 0) {
      return NextResponse.json(
        { success: true, message: 'No friends found.', friends: [] },
        { status: 200 },
      )
    }
    return NextResponse.json(
      { success: true, message: 'Friends fetched successfully.', friends },
      { status: 200 },
    )
  } catch (error: unknown) {
    console.error('Error fetching friends:', error)
    let errorMessage = 'Unknown error'
    if (error instanceof Error) {
      errorMessage = error.message
    } else if (typeof error === 'string') {
      errorMessage = error 
    }
    return NextResponse.json(
      {
        success: false,
        message: 'Server error.',
        error: errorMessage,
      },
      { status: 500 },
    )
  }
}

export { GET }
