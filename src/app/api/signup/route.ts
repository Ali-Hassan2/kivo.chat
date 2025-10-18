import { NextResponse } from 'next/server'
import { UserModel } from '@/entities'
import { sendEmail } from '@/helpers'
import { connect_db } from '@/settings'

async function POST(request: Request) {
  if (request.method !== 'POST') {
    return NextResponse.json(
      {
        success: false,
        message: 'Sorry, this endpoint only supports POST requests.',
        user: null,
      },
      { status: 400 },
    )
  }
  await connect_db()
  try {
    const { username, email, password } = await request.json()
    const userByUsername = await UserModel.findOne({ username })
    if (userByUsername) {
      if (userByUsername.isVerifiedUser) {
        return NextResponse.json(
          { success: false, message: 'Username already taken.', user: null },
          { status: 400 },
        )
      } else {
        const verifyCode = Math.floor(
          100000 + Math.random() * 900000,
        ).toString()
        userByUsername.verficationCode = verifyCode
        userByUsername.verficationExpiry = new Date(Date.now() + 10 * 60 * 1000)
        await userByUsername.save()

        const resendResponse = await sendEmail({
          email: userByUsername.email,
          username,
          verifyCode,
        })
        return !resendResponse.success
          ? NextResponse.json(
              {
                success: false,
                message: resendResponse.message || 'Failed to send code.',
                user: null,
              },
              { status: 500 },
            )
          : NextResponse.json(
              {
                success: true,
                message: 'Verification code sent. Please verify your account.',
                user: userByUsername,
              },
              { status: 200 },
            )
      }
    }

    const userByEmail = await UserModel.findOne({ email })
    if (userByEmail) {
      if (userByEmail.isVerifiedUser) {
        return NextResponse.json(
          { success: false, message: 'Email already registered.', user: null },
          { status: 400 },
        )
      } else {
        const verifyCode = Math.floor(
          100000 + Math.random() * 900000,
        ).toString()
        userByEmail.verficationCode = verifyCode
        userByEmail.verficationExpiry = new Date(Date.now() + 10 * 60 * 1000)
        await userByEmail.save()
        const resendResponse = await sendEmail({
          email: userByEmail.email,
          username,
          verifyCode,
        })
        return !resendResponse.success
          ? NextResponse.json(
              {
                success: false,
                message: resendResponse.message || 'Failed to send code.',
                user: null,
              },
              { status: 500 },
            )
          : NextResponse.json(
              {
                success: true,
                message: 'Verification code sent. Please verify your account.',
                user: userByEmail,
              },
              { status: 200 },
            )
      }
    }

    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString()
    const newUser = await UserModel.create({
      username,
      password,
      email,
      verficationCode: verifyCode,
      verficationExpiry: new Date(Date.now() + 10 * 60 * 1000),
      isVerifiedUser: false,
      isAnon: false,
      friends: [],
      requests: [],
      blocks: [],
    })

    const resendResponse = await sendEmail({ email, username, verifyCode })

    return !resendResponse.success
      ? NextResponse.json(
          {
            success: false,
            message: resendResponse.message || 'Failed to send email code.',
            user: null,
          },
          { status: 500 },
        )
      : NextResponse.json(
          {
            success: true,
            message: 'Account created. Please verify your account.',
            user: newUser,
          },
          { status: 201 },
        )
  } catch (error) {
    console.error('Error during signup:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error.', user: null },
      { status: 500 },
    )
  }
}

export { POST }
