import { NextResponse } from 'next/server'
import { Types } from 'mongoose'
import { getServerSession } from 'next-auth'
import { REQUEST_STATUS } from '@/constants'
import { RequestModel, UserModel } from '@/entities'
import { requestIdSchema } from '@/guards'
import { connect_db } from '@/settings'
import { authOptions } from '../../auth/[...nextauth]/options'

async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const requestId = searchParams.get('requestId') || ''
    const decodedRequestId = decodeURIComponent(requestId)
    const parsed = requestIdSchema.safeParse(decodedRequestId)
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Request ID validation failed.',
          error: parsed.error.issues.map((err) => err.message),
        },
        { status: 400 },
      )
    }
    const session = await getServerSession(authOptions)
    if (!session?.user?.username) {
      return NextResponse.json(
        { success: false, message: 'Please login first.' },
        { status: 401 },
      )
    }
    await connect_db()
    const requestDoc = await RequestModel.findOne({
      _id: parsed.data,
      status: REQUEST_STATUS.PENDING,
    })
    if (!requestDoc) {
      return NextResponse.json(
        { success: false, message: 'No such pending request found.' },
        { status: 404 },
      )
    }
    const [sender, receiver] = await Promise.all([
      UserModel.findById(requestDoc.from),
      UserModel.findById(requestDoc.to),
    ])
    if (!sender || !receiver) {
      return NextResponse.json(
        { success: false, message: 'Sender or receiver not found.' },
        { status: 404 },
      )
    }
    const isAlreadyFriends =
      sender.friends.some(
        (id) => id.toString() === (receiver._id as Types.ObjectId).toString(),
      ) ||
      receiver.friends.some(
        (id) => id.toString() === (sender._id as Types.ObjectId).toString(),
      )
    if (isAlreadyFriends) {
      await RequestModel.findByIdAndDelete(requestDoc._id)
      return NextResponse.json(
        { success: false, message: 'Already friends.' },
        { status: 400 },
      )
    }
    sender.friends.push(receiver._id as Types.ObjectId)
    receiver.friends.push(sender._id as Types.ObjectId)
    sender.requests = sender.requests.filter(
      (rId) => rId.toString() !== (requestDoc._id as Types.ObjectId).toString(),
    )
    receiver.requests = receiver.requests.filter(
      (rId) => rId.toString() !== (requestDoc._id as Types.ObjectId).toString(),
    )
    requestDoc.status = REQUEST_STATUS.APPROVED
    await Promise.all([sender.save(), receiver.save(), requestDoc.save()])
    return NextResponse.json(
      { success: true, message: 'Friend request accepted successfully.' },
      { status: 200 },
    )
  } catch (error) {
    console.error('Accept request error:', error)
    return NextResponse.json(
      { success: false, message: 'Server error.' },
      { status: 500 },
    )
  }
}

export { PUT }
