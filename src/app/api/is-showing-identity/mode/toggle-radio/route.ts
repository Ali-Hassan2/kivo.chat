import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import { UserModel } from '@/entities'
import { connect_db } from '@/settings'

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
    if (!session?.user?._id) {
      return NextResponse.json(
        {
          success: false,
          message: 'No Server Found',
        },
        {
          status: 401,
        },
      )
    }
    await connect_db()
    const body = await request.json()
    if (typeof body.flag !== 'boolean') {
      return NextResponse.json(
        {
          scucess: false,
          message: 'Forbidden: Invalid Flag',
        },
        {
          status: 400,
        },
      )
    }

    const uid = session.user._id
    const user = await UserModel.findById(uid)

    if (!user) {
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
  } catch (error: unknown) {
    // TODO:
  }
}
