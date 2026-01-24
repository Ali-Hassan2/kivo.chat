import mongoose, { Document, Schema, Types } from 'mongoose'
import { REQUEST_STATUS } from '@/constants'
import { IUser } from './user.model'

export interface IRequest extends Document {
  from: Types.ObjectId | IUser
  to: Types.ObjectId | IUser
  status: string
}

const RequestSchema: Schema<IRequest> = new Schema(
  {
    from: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    to: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(REQUEST_STATUS),
      default: REQUEST_STATUS.PENDING,
    },
  },
  { timestamps: true },
)

const RequestModel =
  (mongoose.models.Requests as mongoose.Model<IRequest>) ||
  mongoose.model<IRequest>('Requests', RequestSchema)

export { RequestModel }
