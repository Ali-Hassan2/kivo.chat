import { NextResponse } from 'next/server'
import { ConversationModel, MessageModel } from '@/entities'
import { getCurrentUser } from '@/helpers'

async function GET(request: Request) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: 'Session not found',
        },
        { status: 400 },
      )
    }
    const conversations = await ConversationModel.find({
      participants: { $in: [user._id] },
    })
      .populate('participants', '_id username fullName')
      .populate('lastMessage')
      .sort({ 'lastMessage.createdAt': -1 })

    if (conversations.length === 0) {
      return NextResponse.json(
        {
          success: true,
          message: 'No conversations found',
          data: [],
        },
        { status: 200 },
      )
    }
    const result = await Promise.all(
      conversations.map(async (con) => {
        const unread = await MessageModel.countDocuments({
          conversation: con._id,
          sender: { $ne: user._id },
          readBy: { $ne: user._id },
        })
        return {
          _id: con._id,
          participants: con.participants,
          lastMessage: con.lastMessage,
          unreadCount: unread,
        }
      }),
    )
    return NextResponse.json(
      {
        success: true,
        message: 'Conversations loaded successfully',
        data: result,
      },
      { status: 200 },
    )
  } catch (error: any) {
    console.error(error)
    return NextResponse.json(
      {
        success: false,
        message: 'Server error',
        error: error.message || 'Unknown error',
      },
      { status: 500 },
    )
  }
}

export { GET }
