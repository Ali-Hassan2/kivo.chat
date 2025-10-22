import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { RequestModel, UserModel } from '@/entities'
import { requestIdSchema } from '@/guards'
import { connect_db } from '@/settings'
import { authOptions } from '../../auth/[...nextauth]/options'

const userNameQuerySchema = z.string().min(3).max(30)

async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const usernameFromQueryParams = searchParams.get('username') || ''
    const requestId = searchParams.get('requestId') || ''
    const decodedUsername = decodeURIComponent(usernameFromQueryParams)
    const decodedRequestId = decodeURIComponent(requestId)
    const parsedUsername = userNameQuerySchema.safeParse(decodedUsername)
    if (!parsedUsername.success) {
      return NextResponse.json({
        success: false,
        message: 'Username Validation Error',
        error: parsedUsername.error.issues.map((err) => err.message),
      })
    }
    const parsedRequestId = requestIdSchema.safeParse(decodedRequestId)
    if (!parsedRequestId.success) {
      return NextResponse.json({
        success: false,
        message: 'Request Id validation Failed.',
        error: parsedRequestId.error.issues.map((err) => err.message),
      })
    }
    const session = await getServerSession(authOptions)
    if (!session?.user?.username) {
      return NextResponse.json(
        { success: false, message: 'Please login first.' },
        { status: 401 },
      )
    }
    await connect_db()
    const requestDoc = await RequestModel.findById(requestId)
    if (!requestDoc) {
      return NextResponse.json(
        { success: false, message: 'Sorry, no request found.' },
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
    sender.requests = sender.requests.filter(
      (rId) => rId.toString() !== requestId.toString(),
    )
    receiver.requests = receiver.requests.filter(
      (rId) => rId.toString() !== requestId.toString(),
    )
    await sender.save()
    await receiver.save()
    await RequestModel.findByIdAndDelete(requestId)
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
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { RequestModel, UserModel } from '@/entities'
import { requestIdSchema } from '@/guards'
import { connect_db } from '@/settings'
import { authOptions } from '../../auth/[...nextauth]/options'

const userNameQuerySchema = z.string().min(3).max(30)

async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const usernameFromQueryParams = searchParams.get('username') || ''
    const requestId = searchParams.get('requestId') || ''
    const decodedUsername = decodeURIComponent(usernameFromQueryParams)
    const decodedRequestId = decodeURIComponent(requestId)
    const parsedUsername = userNameQuerySchema.safeParse(decodedUsername)
    if (!parsedUsername.success) {
      return NextResponse.json({
        success: false,
        message: 'Username Validation Error',
        error: parsedUsername.error.issues.map((err) => err.message),
      })
    }
    const parsedRequestId = requestIdSchema.safeParse(decodedRequestId)
    if (!parsedRequestId.success) {
      return NextResponse.json({
        success: false,
        message: 'Request Id validation Failed.',
        error: parsedRequestId.error.issues.map((err) => err.message),
      })
    }
    const session = await getServerSession(authOptions)
    if (!session?.user?.username) {
      return NextResponse.json(
        { success: false, message: 'Please login first.' },
        { status: 401 },
      )
    }
    await connect_db()
    const requestDoc = await RequestModel.findById(requestId)
    if (!requestDoc) {
      return NextResponse.json(
        { success: false, message: 'Sorry, no request found.' },
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
    sender.requests = sender.requests.filter(
      (rId) => rId.toString() !== requestId.toString(),
    )
    receiver.requests = receiver.requests.filter(
      (rId) => rId.toString() !== requestId.toString(),
    )
    await sender.save()
    await receiver.save()
    await RequestModel.findByIdAndDelete(requestId)
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
