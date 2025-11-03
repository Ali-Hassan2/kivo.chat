import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { UserModel } from '@/entities'
import { authOptions } from '../../auth/[...nextauth]/options'

async function POST(request: Request) {
  try {
    if (request.method !== 'POST') {
      return NextResponse.json(
        { success: false, message: 'Method Not Allowed' },
        { status: 405 },
      )
    }
    const session = await getServerSession(authOptions)
    if (!session?.user?._id) {
      return NextResponse.json(
        { success: false, message: 'Session not found' },
        { status: 401 },
      )
    }
    const body = await request.json()
    if (typeof body.accm !== 'boolean') {
      return NextResponse.json(
        { success: false, message: 'Invalid or missing flag' },
        { status: 400 },
      )
    }
    const uid = session.user._id
    const newFlag = body.accm
    const user = await UserModel.findById(uid)
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 },
      )
    }
    if (user.isAcceptingMessages === newFlag) {
      return NextResponse.json(
        {
          success: false,
          message: 'Already flagged',
          flag: user.isAcceptingMessages,
        },
        { status: 400 },
      )
    }
    const updatedUser = await UserModel.findByIdAndUpdate(
      uid,
      { isAcceptingMessages: newFlag },
      { new: true },
    )
    return NextResponse.json(
      { success: true, message: 'Mode updated successfully', updatedUser },
      { status: 200 },
    )
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 },
    )
  }
}

export { POST }
