import { NextResponse } from 'next/server'
import { IdentityModel } from '@/entities/identity-profiles'
import { getCurrentUser } from '@/helpers'

class GET_ALL_FAKE_PROFILES {
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

  static async UserCheck(user: any) {
    if (!user) {
      return this.respond(false, 'user not found.', null, 400)
    }
    return user
  }

  async handle(request: Request) {
    try {
      const methodCheckResult = await GET_ALL_FAKE_PROFILES.MethodCheck(request)
      if (methodCheckResult) {
        return methodCheckResult
      }
      const user = await getCurrentUser()
      const userCheckResult = await GET_ALL_FAKE_PROFILES.UserCheck(user)
      if (userCheckResult) {
        return userCheckResult
      }
      const profilesData = await IdentityModel.find({
        where: { user: userCheckResult?._id },
      })
      if (profilesData.length > 0) {
        return GET_ALL_FAKE_PROFILES.respond(
          true,
          'Profiles Received',
          { profiles: profilesData },
          200,
        )
      }
    } catch (error: unknown) {
      console.log('The error is', error)
      return GET_ALL_FAKE_PROFILES.respond(
        false,
        'Something went wrong',
        error,
        500,
      )
    }
  }
}
async function GET(request: Request) {
  const classHandler = new GET_ALL_FAKE_PROFILES()
  return await classHandler.handle(request)
}

export { GET }
