import { NextResponse } from 'next/server'
import { UserCheck } from 'lucide-react'
import { Types } from 'mongoose'
import { RequestModel } from '@/entities'
import { getCurrentUser } from '@/helpers'

class GETREQUESTSTATUS {
  static respond(
    success: boolean,
    message: string,
    data: any = null,
    status: number,
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
      return this.respond(false, 'Method Not Allowed', null, 405)
    }
    return null
  }
  static UserCheck(user: any) {
    if (!user) {
      return this.respond(false, 'User not found', null, 400)
    }
    return null
  }

  async handle(request: Request) {
    try {
      const MethodCheckResult = GETREQUESTSTATUS.MethodCheck(request)
      if (MethodCheckResult) {
        return MethodCheckResult
      }
      const user = await getCurrentUser()
      const UserCheckResult = GETREQUESTSTATUS.UserCheck(user)
      if (UserCheckResult) {
        return UserCheckResult
      }
      const userId = user?._id
      const requests = await RequestModel.find({
        $or: [
          { from: userId },
          {
            to: userId,
          },
        ],
      })
      const statusMap: Record<string, string> = {}
      requests.forEach((request) => {
        if (
          (request.from as Types.ObjectId).toString() ===
          (userId as Types.ObjectId).toString()
        ) {
          statusMap[request.to.toString()] = request.status
        } else if (
          (request.to as Types.ObjectId).toString() ===
          (userId as Types.ObjectId).toString()
        ) {
          statusMap[request.from.toString()] = request.status
        }
      })

      return GETREQUESTSTATUS.respond(
        true,
        'Request statuses found.',
        { statuses: statusMap },
        200,
      )
    } catch (error: unknown) {
      let errorMessage = 'unknown server error'
      if (error instanceof Error) {
        errorMessage = error?.message
      }
      if (typeof error === 'string') {
        errorMessage = error
      }
      return GETREQUESTSTATUS.respond(false, errorMessage, null, 500)
    }
  }
}

async function GET(request: Request) {
  const gettingRequestStatuses = new GETREQUESTSTATUS()
  return await gettingRequestStatuses.handle(request)
}

export { GET }
