import { NextResponse } from 'next/server'
import { Types } from 'mongoose'
import { CHAT_ENGINE } from '@/constants'
import { ConversationModel, MessageModel, UserModel } from '@/entities'
import { ObjectIdGuard } from '@/guards'
import { getCurrentUser } from '@/helpers'
import { connect_db } from '@/settings'

async function POST(request: Request) {
  try {
    await connect_db()

    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Session not found' },
        { status: 401 },
      )
    }

    const { searchParams } = new URL(request.url)
    const rawReceiverId = searchParams.get('receiverId') || ''
    const decodedReceiverId = decodeURIComponent(rawReceiverId)
    const parsedId = ObjectIdGuard.safeParse(decodedReceiverId)

    if (!parsedId.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid receiver ID',
          errors: parsedId.error.issues.map((i) => i.message),
        },
        { status: 400 },
      )
    }
    const receiverId = parsedId.data
    const { content } = await request.json()

    if (!content || content.trim() === '') {
      return NextResponse.json(
        { success: false, message: 'Message content is required' },
        { status: 400 },
      )
    }
    if ((user._id as Types.ObjectId).toString() === receiverId) {
      return NextResponse.json(
        { success: false, message: 'Cannot send message to yourself' },
        { status: 400 },
      )
    }
    const targetUser = await UserModel.findById(receiverId)
    if (!targetUser) {
      return NextResponse.json(
        { success: false, message: 'Receiver not found' },
        { status: 404 },
      )
    }
    if (!targetUser.isAcceptingMessages) {
      return NextResponse.json(
        { success: false, message: 'Receiver is not accepting messages' },
        { status: 403 },
      )
    }
    let conversation = await ConversationModel.findOne({
      participants: {
        $all: [user._id as Types.ObjectId, new Types.ObjectId(receiverId)],
      },
    })

    if (!conversation) {
      conversation = await ConversationModel.create({
        participants: [user._id, receiverId],
      })
    }

    // Create message
    const message = await MessageModel.create({
      sender: user._id,
      receiver: receiverId,
      content: content.trim(),
      conversation: conversation._id,
    })

    // Update conversation last message
    await ConversationModel.findByIdAndUpdate(conversation._id, {
      lastMessage: message._id,
    })

    // Notify chat engine asynchronously (best-effort)
    ;(async () => {
      try {
        const notifyBody = {
          receiverId: receiverId,
          message: {
            _id: message._id,
            sender: user._id,
            receiver: receiverId,
            content: message.content,
            conversation: conversation._id,
          },
        }

        await fetch(`${CHAT_ENGINE}/message`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(notifyBody),
        })
      } catch (notifyErr) {
        console.error('Failed to notify chat engine:', notifyErr)
      }
    })()

    return NextResponse.json(
      { success: true, message: 'Message sent successfully', data: message },
      { status: 201 },
    )
  } catch (error) {
    console.error('Error in sendmessage:', error)
    let errorMessage = 'Unknown error'
    if (error instanceof Error) errorMessage = error.message
    else if (typeof error === 'string') errorMessage = error

    return NextResponse.json(
      { success: false, message: 'Server error', error: errorMessage },
      { status: 500 },
    )
  }
}

export { POST }
