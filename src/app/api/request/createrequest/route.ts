import { NextResponse } from 'next/server'
import { Types } from 'mongoose'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { REQUEST_STATUS } from '@/constants'
import { RequestModel, UserModel } from '@/entities'
import { connect_db } from '@/settings'
import { authOptions } from '../../auth/[...nextauth]/options'

const usernameQuerySchema = z.string().min(3).max(30)

async function POST(request: Request) {
  try {
    if (request.method !== 'POST') {
      return NextResponse.json(
        { success: false, message: 'Only POST requests allowed.' },
        { status: 405 },
      )
    }
    const session = await getServerSession(authOptions)
    if (!session?.user?.username) {
      return NextResponse.json(
        { success: false, message: 'You must be logged in to send a request.' },
        { status: 401 },
      )
    }
    await connect_db()
    const { searchParams } = new URL(request.url)
    const rawUsername = searchParams.get('username') || ''
    const decodedUsername = decodeURIComponent(rawUsername)
    const parseResult = usernameQuerySchema.safeParse(decodedUsername)

    if (!parseResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid username.',
          errors: parseResult.error.issues.map((i) => i.message),
        },
        { status: 400 },
      )
    }
    console.log('Logged in user:', session.user.username)
    const targetUsername = parseResult.data
    console.log('Target username:', targetUsername)

    const [sender, receiver] = await Promise.all([
      UserModel.findOne({ username: session.user.username }),
      UserModel.findOne({ username: targetUsername }),
    ])
    if (!sender || !receiver) {
      return NextResponse.json(
        { success: false, message: 'Sender or receiver not found.' },
        { status: 404 },
      )
    }
    const isAlreadyFriend = receiver.friends.some(
      (f) => f._id.toString() === (sender._id as Types.ObjectId).toString(),
    )
    const isAlreadyRequested = await RequestModel.findOne({
      from: sender._id,
      to: receiver._id,
      status: REQUEST_STATUS.PENDING,
    })
    if (isAlreadyFriend) {
      return NextResponse.json(
        { success: false, message: 'You are already friends.' },
        { status: 400 },
      )
    }

    if (isAlreadyRequested) {
      return NextResponse.json(
        { success: false, message: 'Friend request already sent and pending.' },
        { status: 400 },
      )
    }
    const newRequest = await RequestModel.create({
      from: sender._id,
      to: receiver._id,
      status: REQUEST_STATUS.PENDING,
    })
    receiver.requests.push(newRequest._id as Types.ObjectId)
    await receiver.save()
    return NextResponse.json(
      { success: true, message: 'Friend request sent.', newRequest },
      { status: 200 },
    )
  } catch (error: unknown) {
    console.error('Friend request error:', error)
    return NextResponse.json(
      { success: false, message: 'Server error.' },
      { status: 500 },
    )
  }
}

export { POST }
