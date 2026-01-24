import { NextResponse } from 'next/server'
import { string } from 'zod'
import { fakeProfileSchema } from '@/guards/fake-profile.guard'
import { getCurrentUser } from '@/helpers'

class NEW_FAKE_PROFILE {
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

  static async getBodyFiltered(request: Request) {
    const body = await request.json()
    const parsedBody = fakeProfileSchema.safeParse(body)
    if (!parsedBody.success) {
      this.respond(
        false,
        'Body is not valid',
        parsedBody.error.issues.map((i) => i.message),
        405,
      )
    }
    return body
  }

  static async userValidation(user: any) {
    if (!user) return this.respond(false, 'User not found', null, 400)
    return null
  }

  static methodValidation(request: Request) {
    if (request.method !== 'POST') {
      return this.respond(false, 'Method not allowed', null, 405)
    }
  }

  async handle(request: Request) {
    const methodCheck = NEW_FAKE_PROFILE.methodValidation(request)
    if (methodCheck) {
      return methodCheck
    }
    const user = await getCurrentUser()
    const userCheckResult = NEW_FAKE_PROFILE.userValidation(user)
    if (userCheckResult) {
      return userCheckResult
    }
    const body = await NEW_FAKE_PROFILE.getBodyFiltered(request)

    console.log('The body is:', body)
  }
}

async function POST(request: Request) {
  const ProfileMaker = new NEW_FAKE_PROFILE()
  return await ProfileMaker.handle(request)
}

export { POST }
