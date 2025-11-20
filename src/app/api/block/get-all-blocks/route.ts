import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { UserModel } from '@/entities'
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
        {
          success: false,
          message: 'No Session Found.',
        },
        {
          status: 400,
        },
      )
    }
    const uid = session?.user._id
    const user = await UserModel.findById(uid)
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: 'No User Found.',
        },
        {
          status: 400,
        },
      )
    }
    const blocks = user.blocks
    if (blocks.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'Blocked Users not found',
        },
        {
          status: 400,
        },
      )
    }
    
    return NextResponse.json(
      {
        success: false,
        message: 'Endpoint not yet implemented.',
      },
      {
        status: 501,
      },
    )
  } catch (error: unknown) {
    console.error('Error in get-all-blocks:', error)
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
