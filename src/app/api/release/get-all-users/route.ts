import { NextResponse } from 'next/server'
import { Types } from 'mongoose'
import { UserModel } from '@/entities'
import { getCurrentUser } from '@/helpers'

class GETTINGUSERS {
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
  static MethodCheck(request: Request) {
    if (request.method !== 'GET') {
      return this.respond(false, 'Method Not Allowed.', null, 400)
    }
    return null
  }

  static UserCheck(user: any) {
    if (!user) {
      return this.respond(false, 'User Not Found.', null, 400)
    }
    return null
  }

  async handle(request: Request) {
    const methodCheckResult = GETTINGUSERS.MethodCheck(request)
    if (methodCheckResult) return methodCheckResult
    const user = await getCurrentUser()
    const UserCheckResult = GETTINGUSERS.UserCheck(user)
    if (UserCheckResult) return UserCheckResult

    try {
      const users = await UserModel.find({}).lean()
      let count = 0
      for (let i = 0; i < users.length; i++) {
        count++
      }
      if (count === 0) {
        return GETTINGUSERS.respond(false, 'No Users found', null, 400)
      }
      const user_id_str = user?._id
      const friendsIds = user?.friends.map((f: any) => f.toString())
      const filteredUsers = users
        .filter(
          (uid) =>
            (uid._id as Types.ObjectId).toString() !==
              (user_id_str as Types.ObjectId).toString() &&
            !friendsIds?.includes((uid._id as Types.ObjectId).toString()),
        )
        .map(({ friends, ...rest }) => ({ ...rest }))
      return GETTINGUSERS.respond(true, 'Users Fetched', filteredUsers, 200)
    } catch (error: unknown) {
      let errorMessage = 'Unknown Error'
      if (error instanceof Error) {
        errorMessage = error?.message
      } else if (typeof error === 'string') {
        errorMessage = error
      }
      return GETTINGUSERS.respond(false, errorMessage, null, 500)
    }
  }
}

async function GET(request: Request) {
  const gettingUsersHandler = new GETTINGUSERS()
  return await gettingUsersHandler.handle(request)
}

export { GET }
