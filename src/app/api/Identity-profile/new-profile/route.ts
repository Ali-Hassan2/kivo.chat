import { NextResponse } from 'next/server'
import { Types } from 'mongoose'
import { string } from 'zod'
import { UserModel } from '@/entities'
import { IdentityModel } from '@/entities/identity-profiles'
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
      return this.respond(
        false,
        'Body is not valid',
        parsedBody.error.issues.map((i) => i.message),
        405,
      )
    }
    return parsedBody.data
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
    const userCheckResult = await NEW_FAKE_PROFILE.userValidation(user)
    if (userCheckResult) {
      return userCheckResult
    }
    const body = await NEW_FAKE_PROFILE.getBodyFiltered(request)
    if (body instanceof NextResponse) {
      return body
    }
    const new_username = body.username
    const new_email = body.email
    const existingProfile = await IdentityModel.findOne({
      $or: [{ email: new_email }, { username: new_username }],
    })

    if (existingProfile) {
      return NEW_FAKE_PROFILE.respond(
        false,
        'Please use unique email and username.',
        null,
        400,
      )
    }

    const userId = user!._id
    const iterNumber = await IdentityModel.countDocuments({
      user: userId,
    })
    const newCount = iterNumber + 1
    const newProfile = await IdentityModel.create({
      username: new_username,
      fullName: body.fullName,
      email: new_email,
      bio: body.bio,
      user: userId,
      iterNuber: newCount,
    })

    if (user) {
      user.activeFakeProfileId = newProfile._id as Types.ObjectId
      await user.save()
    }
    return NEW_FAKE_PROFILE.respond(
      true,
      'Fake profile created',
      newProfile,
      200,
    )
  }
}

async function POST(request: Request) {
  const ProfileMaker = new NEW_FAKE_PROFILE()
  return await ProfileMaker.handle(request)
}

export { POST }
