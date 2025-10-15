import mongoose, { Document, Schema, Types } from 'mongoose'
import { IUser } from './user.model'

export interface IRequest extends Document {
  from: Types.ObjectId | IUser
  createdAt: Date
  updatedAt: Date
}

const RequestSchema: Schema<IRequest> = new Schema(
  {
    from: {
      type: Types.ObjectId,
      ref: 'User',
      default: [],
    },
  },
  { timestamps: true },
)

const RequestModel =
  (mongoose.models.Requests as mongoose.Model<IRequest>) ||
  mongoose.model<IRequest>('Requests', RequestSchema)

export { RequestModel }
