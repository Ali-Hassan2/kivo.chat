import bcrypt from 'bcrypt'
import mongoose, { Document, Schema, Types } from 'mongoose'

export interface IUser extends Document {
  username: string
  email: string
  password: string
  verficationCode: string
  verficationExpiry: Date
  isVerifiedUser: boolean
  isAcceptingMessages: boolean
  isShowingIdentity: boolean
  fullName?: string
  bio?: string
  isAnon: boolean
  friends: Types.ObjectId[]
  requests: Types.ObjectId[]
  blocks: Types.ObjectId[]
  pfp?: {
    url: string
    public_id: string
  }
  coverImage?: {
    url: string
    publidId: string
  }
  createdAt?: Date
  updatedAt?: Date
  comparePassword(candidatePassword: string): Promise<boolean>
}

const UserSchema: Schema<IUser> = new Schema(
  {
    username: {
      type: String,
      unique: true,
      trim: true,
      required: [true, 'Username is required.'],
    },
    email: {
      type: String,
      // unique: true,
      // trim: true,
      required: [true, 'Email is required.'],
      lowercase: true,
      // match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
    },
    password: {
      type: String,
      required: [true, 'Password is required.'],
      trim: true,
      minlength: [6, 'Password must be at least 6 characters long.'],
    },
    verficationCode: {
      type: String,
      required: [true, 'Verfication Code is required.'],
    },
    verficationExpiry: {
      type: Date,
      required: [true, 'Verification Code Expiry is required.'],
    },
    isVerifiedUser: {
      type: Boolean,
      default: false,
    },
    fullName: {
      type: String,
    },
    bio: {
      type: String,
    },
    isAnon: {
      type: Boolean,
      default: false,
    },
    isAcceptingMessages: {
      type: Boolean,
      default: true,
    },
    isShowingIdentity: {
      type: Boolean,
      default: true,
    },
    friends: [
      {
        type: Types.ObjectId,
        ref: 'User',
        default: [],
      },
    ],
    requests: [
      {
        type: Types.ObjectId,
        ref: 'UserModel',
        default: [],
      },
    ],
    blocks: [
      {
        type: Types.ObjectId,
        ref: 'UserModel',
        default: [],
      },
    ],
    pfp: {
      url: {
        type: String,
      },
      publicId: {
        type: String,
      },
    },
    coverImage: {
      url: {
        type: String,
      },
      publicId: {
        type: String,
      },
    },
  },
  { timestamps: true },
)

// delete mongoose.models.User
const UserModel =
  (mongoose.models.User as mongoose.Model<IUser>) ||
  mongoose.model<IUser>('User', UserSchema)

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

UserSchema.methods.comparePassword = async function (
  candidatePassword: string,
) {
  return bcrypt.compare(candidatePassword, this.password)
}
export { UserModel, UserSchema }
