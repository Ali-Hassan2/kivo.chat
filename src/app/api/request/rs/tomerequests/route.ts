import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import { REQUEST_STATUS } from '@/constants'
import { RequestModel } from '@/entities'

async function GET(request: Request) {
  if (request.method !== 'GET') {
    return NextResponse.json(
      {
        success: false,
        message: 'Please use the correct method',
      },
      {
        status: 405,
      },
    )
  }
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?._id) {
      return NextResponse.json(
        {
          success: false,
          message: 'No user logged in.',
        },
        { status: 401 },
      )
    }
    const receiverId = session.user._id
    const allrequestsToMe = await RequestModel.find({
      to: receiverId,
      status: { $in: [REQUEST_STATUS.PENDING, REQUEST_STATUS.REJECTED] },
    }).populate('from', 'username')

    let count = 0
    for (let i = 0; i < allrequestsToMe.length; i++) {
      count++
    }
    if (count === 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'There is no such request.',
        },
        {
          status: 400,
        },
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: 'All pending and rejected requests are fetched.',
        requestToMe: allrequestsToMe,
        count: count,
      },
      { status: 200 },
    )
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
