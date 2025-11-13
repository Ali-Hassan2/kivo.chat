import { NextResponse } from 'next/server'
import { Types } from 'mongoose'
import { getServerSession } from 'next-auth'
import { RequestModel, UserModel } from '@/entities'
import { requestIdSchema } from '@/guards'
import { connect_db } from '@/settings'
import { authOptions } from '../../../auth/[...nextauth]/options'

async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const requestId = searchParams.get('requestId') || ''
    const decodedRequestId = decodeURIComponent(requestId)
    const parsedRequestId = requestIdSchema.safeParse(decodedRequestId)
    if (!parsedRequestId.success) {
      return NextResponse.json({
        success: false,
        message: 'Request Id validation failed.',
        error: parsedRequestId.error.issues.map((err) => err.message),
      })
    }
    const session = await getServerSession(authOptions)
    if (!session?.user?._id) {
      return NextResponse.json(
        { success: false, message: 'Please login first.' },
        { status: 401 },
      )
    }
    await connect_db()
    const requestDoc = await RequestModel.findById(parsedRequestId.data)
    if (!requestDoc) {
      return NextResponse.json(
        { success: false, message: 'No request found.' },
        { status: 404 },
      )
    }
    if (requestDoc.from.toString() !== session.user._id.toString()) {
      return NextResponse.json(
        { success: false, message: 'Only sender can cancel this request.' },
        { status: 403 },
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
    sender.requests = sender.requests.filter(
      (rId) => rId.toString() !== (requestDoc._id as Types.ObjectId).toString(),
    )
    receiver.requests = receiver.requests.filter(
      (rId) => rId.toString() !== (requestDoc._id as Types.ObjectId).toString(),
    )
    await sender.save()
    await receiver.save()
    await RequestModel.findByIdAndDelete(requestDoc._id)
    return NextResponse.json(
      { success: true, message: 'Friend request cancelled successfully.' },
      { status: 200 },
    )
  } catch (error) {
    console.error('Cancel request error:', error)
    return NextResponse.json(
      { success: false, message: 'Server error.' },
      { status: 500 },
    )
  }
}

export { POST }
