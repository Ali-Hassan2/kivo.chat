import { NextResponse } from 'next/server'
import { CHAT_ENGINE } from '@/constants'
import { getCurrentUser } from '@/helpers'

interface TypingEventBody {
  receiverId: string
  istyping: boolean
}

const notifyingEngine = async (data: TypingEventBody) => {
  const response = await fetch(`${CHAT_ENGINE}/typing`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(errorText || 'Chat-engine request failed')
  }
}
const UserValidation = (user: any) => {
  if (!user) {
    return NextResponse.json(
      { success: false, message: 'Session not found' },
      { status: 401 },
    )
  }
  return null
}
const methodCheck = (request: Request) => {
  if (request.method !== 'POST') {
    return NextResponse.json(
      { success: false, message: 'Method not allowed' },
      { status: 405 },
    )
  }
  return null
}
async function POST(request: Request) {
  const methodError = methodCheck(request)
  if (methodError) return methodError
  const user = await getCurrentUser()
  const userError = UserValidation(user)
  if (userError) return userError
  const { searchParams } = new URL(request.url)
  const receiverId = searchParams.get('receiverId') || ''
  const istypingParam = searchParams.get('istyping')
  const istyping = istypingParam === 'true'
  if (!receiverId) {
    return NextResponse.json(
      { success: false, message: 'receiverId is required' },
      { status: 400 },
    )
  }
  await notifyingEngine({ receiverId, istyping })
  return NextResponse.json(
    { success: true, message: 'Typing status sent' },
    { status: 200 },
  )
}

export { POST }
