import { NextResponse } from 'next/server'
import { ConversationModel, MessageModel, UserModel } from '@/entities'
import { ObjectIdGuard } from '@/guards'
import { getCurrentUser } from '@/helpers'
import { connect_db } from '@/settings'

async function GET(request: Request) {
  if (request.method !== 'GET') {
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
    await connect_db()
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: 'Session not found.',
        },
        {
          status: 400,
        },
      )
    }

    const { searchParams } = new URL(request.url)
    const rawReceiverId = searchParams.get('receiverId') || ''
    const decodedReceiverId = decodeURIComponent(rawReceiverId)
    const parsedId = ObjectIdGuard.safeParse(decodedReceiverId)
    if (!parsedId.success) {
      return NextResponse.json({
        success: false,
        message: 'Validation failed',
        errors: parsedId.error.issues.map((i) => i.message),
      })
    }
    const receiverId = parsedId.data
    const receiverUser = await UserModel.findById(receiverId)
    if (!receiverUser) {
      return NextResponse.json(
        {
          success: false,
          message: 'Receiver not found in kivo server',
        },
        {
          status: 400,
        },
      )
    }
    if (receiverId === user._id) {
      return NextResponse.json(
        {
          success: false,
          message: 'Cannot load your own conversations.',
        },
        {
          status: 400,
        },
      )
    }

    let conversation = await ConversationModel.findOne({
      participants: {
        $all: [user._id, receiverId],
      },
    })
    if (!conversation) {
      conversation = await ConversationModel.create({
        participants: [user._id, receiverId],
        pinnedMessages: [],
        lastMessage: null,
      })
    }
    const messages = await MessageModel.find({
      conversation: conversation._id,
    })
      .sort({ createdAt: 1 })
      .select('content sender readBy createdAt -_id ')
    if (messages.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'messages not found from kivo Server',
        },
        {
          status: 400,
        },
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Messages loaded successfully.',
        data: messages,
      },
      {
        status: 200,
      },
    )
  } catch (error) {
    console.error('Error loading messages:', error)
    let errorMessage = 'Unknown error'
    if (error instanceof Error) errorMessage = error.message
    else if (typeof error === 'string') errorMessage = error
    return NextResponse.json(
      { success: false, message: 'Server error', error: errorMessage },
      { status: 500 },
    )
  }
}

export { GET }
