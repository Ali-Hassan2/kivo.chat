import mongoose, { Document, Schema, Types } from 'mongoose'
import { IUser } from './user.model'

export interface IIdentityProfiles extends Document {
  fullName: string
  username: string
  email: string
  bio: string
  user: Types.ObjectId | IUser
}

const IdentitySchema: Schema<IIdentityProfiles> = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  bio: {
    type: String,
    required: true,
  },
  user: {
    type: Types.ObjectId,
    red: 'User',
    required: true,
  },
})

const IdentityModel =
  (mongoose.models.Identity as mongoose.Model<IIdentityProfiles>) ||
  mongoose.model<IIdentityProfiles>('Identity', IdentitySchema)

export { IdentityModel }
