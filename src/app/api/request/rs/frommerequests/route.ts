import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import { REQUEST_STATUS } from '@/constants'
import { RequestModel } from '@/entities'
import { connect_db } from '@/settings'

async function GET(request: Request) {
  if (request.method !== 'GET') {
    return NextResponse.json(
      {
        success: false,
        message: 'No method allowed',
      },
      { status: 405 },
    )
  }

  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?._id) {
      return NextResponse.json(
        {
          success: false,
          message: 'Please login first.',
        },
        { status: 401 },
      )
    }

    await connect_db()

    const myId = session.user._id
    const allRequestsFromMe = await RequestModel.find({
      from: myId,
      status: { $in: [REQUEST_STATUS.PENDING, REQUEST_STATUS.REJECTED] },
    }).populate('to', 'username')

    let count = 0
    let i = 0
    while (i < allRequestsFromMe.length) {
      count++
      i++
    }

    if (count === 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'No requests found.',
        },
        { status: 404 },
      )
    }

    return NextResponse.json({
      success: true,
      message: 'All requests from me are fetched.',
      requests: allRequestsFromMe,
      count,
    })
  } catch (error: unknown) {
    console.error('Fetch requests error:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Server error while fetching requests.',
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}

export { GET }
