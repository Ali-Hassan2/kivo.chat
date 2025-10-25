import { NextResponse } from 'next/server'
import { Types } from 'mongoose'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import { REQUEST_STATUS } from '@/constants'
import { RequestModel, UserModel } from '@/entities'
import { requestIdSchema } from '@/guards'
import { connect_db } from '@/settings'

async function POST(request: Request) {
  if (request.method !== 'POST') {
    return NextResponse.json(
      { success: false, message: 'Method not allowed' },
      { status: 405 },
    )
  }

  try {
    const { searchParams } = new URL(request.url)
    const requestId = searchParams.get('requestId') || ''
    const decodedRequestId = decodeURIComponent(requestId)
    const parsedRequestId = requestIdSchema.safeParse(decodedRequestId)
    if (!parsedRequestId.success) {
      return NextResponse.json({
        success: false,
        message: 'Validation error',
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
        { success: false, message: 'Request not found.' },
        { status: 404 },
      )
    }
    const receiver = await UserModel.findById(requestDoc.to)
    if (!receiver) {
      return NextResponse.json(
        { success: false, message: 'Receiver not found.' },
        { status: 404 },
      )
    }
    const receiverId =
      receiver._id instanceof Types.ObjectId
        ? receiver._id.toString()
        : String(receiver._id)
    if (receiverId !== session.user._id.toString()) {
      return NextResponse.json(
        { success: false, message: 'Only receiver can reject this request.' },
        { status: 403 },
      )
    }
    const sender = await UserModel.findById(requestDoc.from)
    if (!sender) {
      return NextResponse.json(
        { success: false, message: 'Sender not found.' },
        { status: 404 },
      )
    }
    requestDoc.status = REQUEST_STATUS.REJECTED
    await requestDoc.save()
    receiver.requests = receiver.requests.filter(
      (rId) => rId.toString() !== (requestDoc._id as Types.ObjectId).toString(),
    )
    sender.requests = sender.requests.filter(
      (rId) => rId.toString() !== (requestDoc._id as Types.ObjectId).toString(),
    )

    await receiver.save()
    await sender.save()
    return NextResponse.json(
      {
        success: true,
        message: 'Request rejected successfully.',
        requestId: requestDoc._id,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error('Reject request error:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Server error while rejecting request.',
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}

export { POST }
