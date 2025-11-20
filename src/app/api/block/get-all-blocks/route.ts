import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { UserModel } from '@/entities'
import { connect_db } from '@/settings'
import { authOptions } from '../../auth/[...nextauth]/options'

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    console.log('Session:', session)
    if (!session?.user?._id) {
      console.error('No session or user ID found')
      return NextResponse.json(
        {
          success: false,
          message: 'No Session Found.',
        },
        {
          status: 401,
        },
      )
    }
    await connect_db()
    const uid = session?.user._id
    const user = await UserModel.findById(uid).populate({
      path: 'blocks',
      select: 'username',
    })
    console.log('User:', user)
    if (!user) {
      console.error('User not found in database')
      return NextResponse.json(
        {
          success: false,
          message: 'No User Found.',
        },
        {
          status: 404,
        },
      )
    }
    const blocks = user.blocks
    console.log('Blocks:', blocks)
    if (!blocks || blocks.length === 0) {
      return NextResponse.json(
        {
          success: true,
          message: 'No blocked users yet',
          data: [],
        },
        {
          status: 200,
        },
      )
    }
    return NextResponse.json(
      {
        success: true,
        message: 'Blocked Users fetched',
        data: blocks,
      },
      {
        status: 200,
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
