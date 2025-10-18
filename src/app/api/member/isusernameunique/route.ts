import { NextResponse } from 'next/server'
import { z } from 'zod'
import { UserModel } from '@/entities'
import { usernameGuard } from '@/guards'
import { connect_db } from '@/settings'

const usernameQuerySchema = z.object({
  username: usernameGuard,
})

async function GET(request: Request) {
  if (request.method !== 'GET') {
    return NextResponse.json(
      {
        success: false,
        message: 'No support for the given method.',
      },
      { status: 405 },
    )
  }
  try {
    await connect_db()
    const { searchParams } = new URL(request.url)
    const usernameFromQuery = searchParams.get('username')

    const usernameFinalShape = usernameQuerySchema.safeParse({
      username: usernameFromQuery,
    })
    if (!usernameFinalShape.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Please validate username',
          errors: usernameFinalShape.error.issues.map((err) => err.message),
        },
        { status: 400 },
      )
    }
    const { username } = usernameFinalShape.data
    console.log('The username is', username)
    const isUsernameExist = await UserModel.findOne({
      username,
      isVerifiedUser: true,
    })
    if (isUsernameExist) {
      return NextResponse.json(
        {
          success: false,
          message: 'Username not available.',
        },
        { status: 400 },
      )
    }
    return NextResponse.json(
      {
        success: true,
        message: 'Username is available.',
      },
      { status: 200 },
    )
  } catch (error: unknown) {
    console.error('Error checking username:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Server Error',
      },
      { status: 500 },
    )
  }
}

export { GET }
