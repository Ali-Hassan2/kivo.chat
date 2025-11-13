import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import { UserModel } from '@/entities'
import { connect_db } from '@/settings'

async function GET(request: Request) {
  try {
    if (request.method !== 'GET') {
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
          status: 401,
        },
      )
    }
    await connect_db()
    const uid = session.user._id
    const user = await UserModel.findById(uid)
    if (!user) {
      return NextResponse.json({
        success: false,
        message: 'User not found',
      })
    }
    console.log('The user is ,', user)
    const userFlag = user.isAcceptingMessages
    return NextResponse.json({
      success: true,
      message: 'Mode fetched',
      mode: userFlag,
    })
  } catch (error: unknown) {
    let errorMessage = 'unknown Error'
    if (error instanceof Error) {
      errorMessage = error.message
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

export { GET }
