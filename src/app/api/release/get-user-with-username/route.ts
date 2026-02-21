import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/helpers'
import { UserModel } from '@/entities'

interface USERGETPARAMS {
  username: string
  receiverId: string
}

class GETUSERWITHPARAMS {
  static respond(
    success: boolean,
    message: string,
    data: any = null,
    status: number,
  ) {
    return NextResponse.json({
      success,
      message,
      data,
      status,
    })
  }

  static async MethodCheck(request: Request) {
    if (request.method !== 'GET') {
      return this.respond(false, 'Method not allowed', null, 405)
    }
  }

  static async userCheck(user: any) {
    if (!user) {
      return this.respond(false, 'User not found', null, 400)
    }
    return null
  }

  static async filterParams(request: Request): Promise<USERGETPARAMS> {
    const { searchParams } = new URL(request.url)
    const rawReceiverId = searchParams.get('receiverId') || ''
    const RawUsername = searchParams.get('username') || ''
    return {
      receiverId: decodeURIComponent(rawReceiverId),
      username: decodeURIComponent(RawUsername),
    }
  }

  async handle(request: Request) {
    const methodCheckResult = GETUSERWITHPARAMS.MethodCheck(request)
    if (methodCheckResult) {
      return methodCheckResult
    }
    const user = getCurrentUser()
    const userCheckResult = await GETUSERWITHPARAMS.userCheck(user)
    if (userCheckResult) {
      return userCheckResult
    }

    try {
      const { receiverId, username } = GETUSERWITHPARAMS.filterParams(request)
      if (!receiverId || !username) {
        return GETUSERWITHPARAMS.respond(
          false,
          'receiverId or username is missing.',
        ,null,400)
      }

      const user = await UserModel.findOne({
        username:username,
        _id:receiverId
      })

      if(!user){
        return GETUSERWITHPARAMS.respond(false,"User not available",null,400)
      }
return GETUSERWITHPARAMS.respond(

    true,
    "user found",
    {user:user},
    200

)
    } catch (error) {}
  }
}
