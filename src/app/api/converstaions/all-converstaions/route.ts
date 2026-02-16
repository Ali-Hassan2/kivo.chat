import { NextResponse } from 'next/server'
import { ConversationModel } from '@/entities'
import { getCurrentUser } from '@/helpers'
import { Conversation } from '@/views/conversation'

class GETALLCONVERSTAIONS {
  static respond(
    success: boolean,
    message: string,
    data: any = null,
    status: number = 200,
  ) {
    return NextResponse.json(
      {
        success,
        message,
        data,
      },
      {
        status,
      },
    )
  }
  static async MethodCheck(request: Request) {
    if (request.method !== 'GET') {
      return this.respond(false, 'Method not allowed', null, 405)
    }
  }

  static checkUser(user: any) {
    if (!user) {
      return this.respond(false, 'User not found', null, 400)
    }
    return null
  }

  async handle(request: Request) {
    try {
      const methodCheckResut = GETALLCONVERSTAIONS.MethodCheck(request)
      if (methodCheckResut) {
        return methodCheckResut
      }
      const user = await getCurrentUser()
      const userCheckResult = GETALLCONVERSTAIONS.checkUser(user)
      if (userCheckResult) {
        return userCheckResult
      }
      const allConversations = await ConversationModel.find({
        participants: user?._id,
      })

      if (allConversations) {
        return GETALLCONVERSTAIONS.respond(
          true,
          'Converastions Loaded.',
          { conversations: allConversations },
          200,
        )
      }
      return GETALLCONVERSTAIONS.respond(
        false,
        'There are no conversations',
        null,
        400,
      )
    } catch (error: unknown) {
      return GETALLCONVERSTAIONS.respond(
        false,
        'Internal Server Error',
        { error: error },
        500,
      )
    }
  }
}

async function GET(request: Request) {
  const newInstance = new GETALLCONVERSTAIONS()
  return await newInstance.handle(request)
}

export { GET }
