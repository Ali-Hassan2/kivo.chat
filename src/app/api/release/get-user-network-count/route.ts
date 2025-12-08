import { NextResponse } from 'next/server'
import { UserModel } from '@/entities'
import { getCurrentUser } from '@/helpers'

class GETUSERNETWORK {
  static respond(
    success: boolean,
    message: string,
    data: any,
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

  static ValidateMethod(request: Request) {
    if (request.method !== 'GET') {
      return this.respond(false, 'Method not allowed', null, 400)
    }
    return null
  }

  static UserValidation(user: any) {
    if (!user) {
      return this.respond(false, 'User not found', null, 400)
    }
    return null
  }

  async handle(request: Request) {
    const ValidateMethodResult = GETUSERNETWORK.ValidateMethod(request)
    if (ValidateMethodResult) {
      return ValidateMethodResult
    }
    const user = await getCurrentUser()
    const userValidationResult = GETUSERNETWORK.UserValidation(user)
    if (userValidationResult) {
      return userValidationResult
    }

    const networkLength = user?.friends.length ?? 0

    return GETUSERNETWORK.respond(true, 'Network count fetched.', {
      networkLength,
    })
  }
}

async function GET(request: Request) {
  const getNetworkHandler = new GETUSERNETWORK()
  return await getNetworkHandler.handle(request)
}

export { GET }
