import { NextResponse } from 'next/server'
import { PIN_ACTIONS } from '@/constants'
import { ObjectIdGuard } from '@/guards'
import { getCurrentUser } from '@/helpers'

export type PinAction = (typeof PIN_ACTIONS)[keyof typeof PIN_ACTIONS]

export interface PINPARAMS {
  messageId: string
  conversationId: string
  action: PinAction
}

class PINMESSAGES {
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
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Session not found' },
        { status: 400 },
      )
    }
    return null
  }

  static MethodCheck(request: Request) {
    if (request.method !== 'PATCH') {
      return NextResponse.json(
        { success: false, message: 'Method not allowed' },
        { status: 405 },
      )
    }
    return null
  }

  static BodyValidator(
    messageId: string,
    conversationId: string,
    action: PinAction,
  ) {
    const ParsedMessageId = ObjectIdGuard.safeParse(messageId)
    const ParsedConversationId = ObjectIdGuard.safeParse(conversationId)
    let errors: string[] = []

    if (!ParsedMessageId.success) {
      errors.push(...ParsedMessageId.error.issues.map((i) => i.message))
    }

    if (!ParsedConversationId.success) {
      errors.push(...ParsedConversationId.error.issues.map((i) => i.message))
    }

    if (action !== PIN_ACTIONS.PIN && action !== PIN_ACTIONS.UNPIN) {
      errors.push('Action not allowed')
    }

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

    if (!bodyValidation.ok) {
      return NextResponse.json({
        success: false,
        message: 'Body Validation failed',
        errors: bodyValidation.errors,
      })
    }

    // TODO: Add your pin/unpin logic here

    return NextResponse.json({ success: true, message: 'Validation passed' })
  }
}

export { PINMESSAGES }
