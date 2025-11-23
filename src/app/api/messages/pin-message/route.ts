import { NextResponse } from 'next/server'
import { Types } from 'mongoose'
import { PIN_ACTIONS } from '@/constants'
import { ConversationModel, MessageModel } from '@/entities'
import { ObjectIdGuard } from '@/guards'
import { getCurrentUser } from '@/helpers'

export type PinAction = (typeof PIN_ACTIONS)[keyof typeof PIN_ACTIONS]

export interface PINPARAMS {
  messageId: string
  conversationId: string
  action: PinAction
}

class PINMESSAGES {
  static respond(
    success: boolean,
    message: string,
    data: any = null,
    status: number = 200,
  ) {
    return NextResponse.json({ success, message, data }, { status })
  }
  static async parseParams(request: Request): Promise<PINPARAMS> {
    const { searchParams } = new URL(request.url)
    const rawConversationId = searchParams.get('conversationId') || ''
    const rawMessageId = searchParams.get('messageId') || ''
    let body: { action?: PinAction } = {}
    try {
      body = await request.json()
    } catch (_) {}
    return {
      messageId: decodeURIComponent(rawMessageId),
      conversationId: decodeURIComponent(rawConversationId),
      action: body.action as PinAction,
    }
  }
  static userValidation(user: any) {
    if (!user) return this.respond(false, 'Session not found', null, 400)
    return null
  }
  static MethodCheck(request: Request) {
    if (request.method !== 'PATCH')
      return this.respond(false, 'Method not allowed', null, 405)
    return null
  }
  static BodyValidator(
    messageId: string,
    conversationId: string,
    action: PinAction,
  ) {
    const ParsedMessageId = ObjectIdGuard.safeParse(messageId)
    const ParsedConversationId = ObjectIdGuard.safeParse(conversationId)
    const errors: string[] = []
    if (!ParsedMessageId.success)
      errors.push(...ParsedMessageId.error.issues.map((i) => i.message))
    if (!ParsedConversationId.success)
      errors.push(...ParsedConversationId.error.issues.map((i) => i.message))
    if (action !== PIN_ACTIONS.PIN && action !== PIN_ACTIONS.UNPIN)
      errors.push('Action not allowed')
    return { ok: errors.length === 0, errors }
  }

  async handle(request: Request) {
    const methodCheckResult = PINMESSAGES.MethodCheck(request)
    if (methodCheckResult) return methodCheckResult
    const user = await getCurrentUser()
    const userCheckResult = PINMESSAGES.userValidation(user)
    if (userCheckResult) return userCheckResult
    const { messageId, conversationId, action } =
      await PINMESSAGES.parseParams(request)
    const bodyValidation = PINMESSAGES.BodyValidator(
      messageId,
      conversationId,
      action,
    )
    if (!bodyValidation.ok)
      return PINMESSAGES.respond(
        false,
        'Body validation failed',
        bodyValidation.errors,
        400,
      )
    const [conversation, message] = await Promise.all([
      ConversationModel.findById(conversationId),
      MessageModel.findById(messageId),
    ])
    if (!conversation || !message)
      return PINMESSAGES.respond(
        false,
        'Conversation or message not found',
        null,
        400,
      )
    const isParticipant = conversation.participants.some(
      (ptr) => ptr._id && ptr._id.toString() === user?._id,
    )
    if (!isParticipant)
      return PINMESSAGES.respond(false, 'Not a participant', null, 400)
    const isAlreadyPinned = conversation.pinnedMessages.some(
      (pin) => pin._id?.toString() === messageId,
    )
    if (action === PIN_ACTIONS.PIN) {
      if (isAlreadyPinned)
        return PINMESSAGES.respond(false, 'Already pinned', null, 400)
      conversation.pinnedMessages.push(new Types.ObjectId(messageId))
      await conversation.save()
      return PINMESSAGES.respond(true, 'Message pinned', message)
    }
    if (action === PIN_ACTIONS.UNPIN) {
      if (!isAlreadyPinned)
        return PINMESSAGES.respond(false, 'Message not pinned', null, 400)
      conversation.pinnedMessages = conversation.pinnedMessages.filter(
        (pin) => pin._id?.toString() !== messageId,
      )
      await conversation.save()
      return PINMESSAGES.respond(true, 'Message unpinned', message)
    }
  }
}

async function PATCH(request: Request) {
  const pinHandler = new PINMESSAGES()
  return await pinHandler.handle(request)
}

export { PATCH }
