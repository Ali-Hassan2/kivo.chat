import mongoose, { Document, Schema, Types } from 'mongoose'

export interface IUser extends Document {
  username: string
  email: string
  password: string
  verficationCode: string
  verficationExpiry: Date
  isVerifiedUser: boolean
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
      unique: true,
      trim: true,
      required: [true, 'Email is required.'],
      match: [/^\\S+@\\S+\\.\\S+$/, 'Please use a valid email address.'],
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
    },
    friends: [
      {
        type: Types.ObjectId,
        ref: 'UserModel',
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

const UserModel =
  (mongoose.models.User as mongoose.Model<IUser>) ||
  mongoose.model<IUser>('User', UserSchema)

export { UserModel, UserSchema }