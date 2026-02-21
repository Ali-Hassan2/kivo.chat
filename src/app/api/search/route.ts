import { NextResponse } from 'next/server'
import { z } from 'zod'
import { UserModel } from '@/entities'
import { connect_db } from '@/settings'

const usernameQuerySchema = z.string().min(3, {
  message: 'Username must be at least 3 characters long.',
})
async function GET(request: Request) {
  try {
    await connect_db()
    const { searchParams } = new URL(request.url)
    const rawUsername = searchParams.get('username') || ''
    const decodedUsername = decodeURIComponent(rawUsername)
    const parseResult = usernameQuerySchema.safeParse(decodedUsername)
    if (!parseResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed.',
          errors: parseResult.error.issues.map((i) => i.message),
        },
        {
          status: 400,
        },
      )
    }
    const user = await UserModel.findOne({
      username: parseResult.data,
    }).select('username fullName bio pfp isAnon')
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: 'User not found.',
        },
        {
          status: 404,
        },
      )
    }
    return NextResponse.json(
      {
        success: true,
        message: 'User found successfully.',
        data: user,
      },
      {
        status: 200,
      },
    )
  } catch (error: unknown) {
    console.error('Search error:', error)
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
      {
        status: 500,
      },
    )
  }
}

export { GET }
