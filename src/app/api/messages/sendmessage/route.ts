import { NextResponse } from 'next/server'
import { Types } from 'mongoose'
import { ConversationModel, UserModel } from '@/entities'
import { ObjectIdGuard } from '@/guards'
import { getCurrentUser } from '@/helpers'

async function POST(request: Request) {
  if (request.method !== 'POST') {
    return NextResponse.json(
      {
        success: false,
        message: 'Method not allowed',
      },
      {
        status: 405,
      },
    )
  }
  try {
    const user = getCurrentUser()
    if (!user) {
      return NextResponse.json({
        success: false,
        message: 'Session not found Please login first',
      })
    }
    const body = request.body
    const { searchParams } = new URL(request.url)
    const rawId = searchParams.get('receiverId') || ''
    const decodedReceiverId = decodeURIComponent(rawId)
    const parsedId = ObjectIdGuard.safeParse(decodedReceiverId)
    if (!parsedId.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed',
          error: parsedId.error.issues.map((err) => err?.message),
        },
        {
          status: 400,
        },
      )
    }

    const { content } = request.body
    if (!content) {
      return NextResponse.json(
        {
          success: false,
          message: 'Message Content is required',
        },
        {
          status: 400,
        },
      )
    }
    // get the status is receiver is accepting messages or not
    const receiverUser = await UserModel.findById(receiverId)
    if(!receiverUser){
        return NextResponse.json(
        {
            success:false,
            message:"No receiver found"
        },{
            status:400
        }
        )
    }
    const isStatusIsValid = receiverUser.isAcceptingMessages
    if(!isStatusIsValid){
        return NextResponse.json({
            success:false,
            message:"User is not accepting messages"
        },{
            status:400
        })
    }
    let isPreviousConversataion = await ConversationModel.findOne({
      participants: {
        $all: [user?._id as Types.ObjectId, receiverId as Types.ObjectId],
      },
    })
    if(!isPreviousConversataion){
        await ConversationModel.
    }
  } catch (error) {}
}
