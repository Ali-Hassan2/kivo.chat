import { NextResponse } from 'next/server'
import { IdentityModel } from '@/entities/identity-profiles'
import { getCurrentUser } from '@/helpers'

class GETPROFILECOUNT {
  static respond(
    success: boolean,
    message: string,
    data: any = null,
    status: number = 200,
  ) {
    return NextResponse.json({ success, message, data }, { status })
  }

  static methodCheck(request: Request) {
    if (request.method !== 'GET') {
      return this.respond(false, 'Method not allowed', null, 405)
    }
  }

  static async userValidation(user: any) {
    if (!user) {
      return this.respond(false, 'User not found', null, 400)
    }
  }

  async handle(request: Request) {
    const methodError = GETPROFILECOUNT.methodCheck(request)
    if (methodError) return methodError

    const userFromSession = await getCurrentUser()
    const userError = await GETPROFILECOUNT.userValidation(userFromSession)
    if (userError) return userError

    try {
      const profiles = await IdentityModel.countDocuments({
        user: userFromSession!._id,
      })

      const currentCount = profiles
      const newCount = currentCount + 1

      return GETPROFILECOUNT.respond(true, 'Count retrieved', {
        current_count: currentCount,
        new_count: newCount,
      })
    } catch (error) {
      console.error(error)
      return GETPROFILECOUNT.respond(false, 'Something went wrong', null, 500)
    }
  }
}

async function GET(request: Request) {
  const countManager = new GETPROFILECOUNT()
  return await countManager.handle(request)
}

export { GET }
