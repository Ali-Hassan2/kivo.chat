import { NextResponse } from 'next/server'
import { Types } from 'mongoose'
import { CHAT_ENGINE } from '@/constants'
import { ConversationModel, MessageModel } from '@/entities'
import { ObjectIdGuard } from '@/guards'
import { getCurrentUser } from '@/helpers'

async function PATCH(request: Request) {
  if (request.method !== 'PATCH') {
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
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: 'Session not found, Please login first.',
        },
        {
          status: 400,
        },
      )
    }
    const { searchParams } = new URL(request.url)
    const rawConversationid = searchParams.get('conversationId') || ''
    const decodedConversationId = decodeURIComponent(rawConversationid)
    const parsedId = ObjectIdGuard.safeParse(decodedConversationId)
    if (!parsedId.success) {
      return NextResponse.json({
        success: false,
        message: 'Validation failed',
        errors: parsedId.error.issues.map((e) => e.message),
      })
    }
    const conversationId = parsedId.data
    const conversation = await ConversationModel.findById(conversationId)
    if (!conversation) {
      return NextResponse.json(
        {
          success: false,
          message: 'Conversation not found',
        },
        {
          status: 400,
        },
      )
    }
    await MessageModel.updateMany(
      {
        conversation: conversation._id,
        sender: { $ne: user._id },
        readBy: { $ne: user._id },
      },
      {
        $addToSet: { readBy: user._id },
      },
    )
    const notifyBody = {
      receiverId: conversation._id,
      userId: (user._id as Types.ObjectId).toString(),
    }
    await fetch(`${CHAT_ENGINE}/read`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(notifyBody),
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Message marked read',
      },
      {
        status: 200,
      },
    )
  } catch (error) {
    console.error('Error marking messages as read:', error)
    let errorMessage = 'Unknown error'
    if (error instanceof Error) errorMessage = error.message
    else if (typeof error === 'string') errorMessage = error
    return NextResponse.json(
      { success: false, message: 'Server error', error: errorMessage },
      { status: 500 },
    )
  }
}

export { PATCH }
