import { NextResponse } from 'next/server'
import mongoose from 'mongoose'
import { UserModel } from '@/entities'
import { getCurrentUser } from '@/helpers'

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
    return NextResponse.json({ success, message, data }, { status })
  }

  static async MethodCheck(request: Request) {
    if (request.method !== 'GET') {
      return this.respond(false, 'Method not allowed', null, 405)
    }
    return null
  }

  static async userCheck(user: any) {
    if (!user) {
      return this.respond(false, 'Session not found', null, 400)
    }
    return null
  }

  static async filterParams(request: Request): Promise<USERGETPARAMS> {
    const { searchParams } = new URL(request.url)

    const rawReceiverId = searchParams.get('receiverId') || ''
    const rawUsername = searchParams.get('username') || ''

    return {
      receiverId: decodeURIComponent(rawReceiverId),
      username: decodeURIComponent(rawUsername),
    }
  }

  async handle(request: Request) {
    const methodCheckResult = await GETUSERWITHPARAMS.MethodCheck(request)
    if (methodCheckResult) return methodCheckResult

    const user = await getCurrentUser()
    const userCheckResult = await GETUSERWITHPARAMS.userCheck(user)
    if (userCheckResult) return userCheckResult

    try {
      const { receiverId, username } =
        await GETUSERWITHPARAMS.filterParams(request)

      if (!receiverId || !username) {
        return GETUSERWITHPARAMS.respond(
          false,
          'receiverId or username is missing.',
          null,
          400,
        )
      }

      const foundUser = await UserModel.findOne({
        _id: receiverId,
        username: username,
      })
        .select(
          'username fullName bio email friends  isShowingIdentity isAcceptingMEssages isVerifiedUser',
        )
        .lean()

      const result = await UserModel.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(receiverId),
            username: username,
          },
        },
        {
          $project: {
            username: 1,
            fullName: 1,
            bio: 1,
            email: 1,
            isShowingIdentity: 1,
            isAcceptingIdentity: 1,
            isVerifiedUser: 1,
            friendsCount: {
              $size: {
                $ifNull: ['$friends', []],
              },
            },
          },
        },
      ])

      if (!foundUser) {
        return GETUSERWITHPARAMS.respond(false, 'User not available', null, 400)
      }
      const friendsCount = foundUser.friends.length
      return GETUSERWITHPARAMS.respond(
        true,
        'User found',
        { user: result },
        200,
      )
    } catch (error) {
      console.error(error)
      return GETUSERWITHPARAMS.respond(false, 'Server error', null, 500)
    }
  }
}

export async function GET(request: Request) {
  const handler = new GETUSERWITHPARAMS()
  return handler.handle(request)
}
