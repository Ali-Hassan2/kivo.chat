import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import { UserModel } from '@/entities'
import { hiddenUserMock } from '@/helpers'
import { connect_db } from '@/settings'

async function POST(request: Request) {
  try {
    if (request.method !== 'POST') {
      return NextResponse.json(
        { success: false, message: 'Method not allowed' },
        { status: 405 },
      )
    }
    await connect_db()
    const session = await getServerSession(authOptions)
    if (!session?.user?._id) {
      return NextResponse.json(
        { success: false, message: 'Session not found' },
        { status: 401 },
      )
    }
    const body = await request.json()
    if (typeof body.flag !== 'boolean') {
      return NextResponse.json(
        { success: false, message: 'Invalid flag type.' },
        { status: 400 },
      )
    }
    const user = await UserModel.findById(session.user._id)
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 },
      )
    }
    const toggleFlag = body.flag
    user.isShowingIdentity = toggleFlag
    await user.save()
    const responseUser = toggleFlag
      ? {
          username: user.username,
          fullName: user.fullName,
          bio: user.bio,
          pfp: user.pfp,
          coverImage: user.coverImage,
        }
      : {
          username: hiddenUserMock.username,
          fullName: hiddenUserMock.fullName,
          bio: hiddenUserMock.bio,
          pfp: hiddenUserMock.pfp,
          coverImage: hiddenUserMock.coverImage,
        }
    return NextResponse.json(
      {
        success: true,
        message: 'Identity updated.',
        user: responseUser,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 },
    )
  }
}

export { POST }
