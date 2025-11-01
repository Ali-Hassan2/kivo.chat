import { NextResponse } from 'next/server'
import { UserModel } from '@/entities'
import { connect_db } from '@/settings'

async function POST(request: Request) {
  try {
    await connect_db()
    const { searchParams } = new URL(request.url)
    const usernameFromQuery = searchParams.get('username')
    const decodedUsername = usernameFromQuery
      ? decodeURIComponent(usernameFromQuery)
      : ''
    const body = await request.json().catch(() => ({}))
    const verifyCode = body?.verifyCode
    console.log('Incoming verification:', {
      username: decodedUsername,
      verifyCode,
    })
    if (!decodedUsername || !verifyCode) {
      return NextResponse.json(
        {
          success: false,
          message: !decodedUsername
            ? 'Please provide the username in query params'
            : 'Please provide the OTP in request body',
        },
        { status: 400 },
      )
    }
    const verifyUser = new Promise<string>(async (resolve, reject) => {
      try {
        const user = await UserModel.findOne({ username: decodedUsername })
        if (!user) return reject('No user found.')
        const isMatch = user.verficationCode === verifyCode
        if (!isMatch) return reject('Invalid verification code.')
        const isCodeExpired = user.verficationExpiry < new Date()
        if (isCodeExpired) return reject('Verification code expired.')
        user.isVerifiedUser = true
        await user.save()
        resolve('User verified successfully.')
      } catch (err) {
        reject('Database operation failed.')
      }
    })
    const result = await verifyUser
    return NextResponse.json(
      { success: true, message: result },
      { status: 200 },
    )
  } catch (error) {
    console.error('Verification error:', error)
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : String(error) || 'Internal Server Error',
      },
      { status: 500 },
    )
  }
}

export { POST }
