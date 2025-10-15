import mongoose, { Document, Schema, Types } from 'mongoose'
import { IConversation } from './conversation.model'
import { IUser } from './user.model'

export interface IMessages extends Document {
  sender: Types.ObjectId | IUser
  receiver: Types.ObjectId | IUser
  content: string
  conversation: Types.ObjectId | IConversation
  isAnon: boolean
  attachments?: {
    url: string
    publicId: string
    fileType?: 'image' | 'video' | 'file'
  }[]
  readBy: (Types.ObjectId | IUser)[]
}

const MessageSchema: Schema<IMessages> = new Schema({
  sender: { type: Types.ObjectId, ref: 'User' },
  receiver: { type: Types.ObjectId, ref: 'User' },
  content: {
    type: String,
    trim: true,
    required: [true, 'Message body is required.'],
  },
  conversation: { type: Types.ObjectId, ref: 'Conversation' },
  isAnon: { type: Boolean, default: false },
  attachments: [
    {
      url: String,
      publicId: String,
      fileType: {
        type: String,
        enum: ['image', 'video', 'file'],
        default: 'image',
      },
    },
  ],
  readBy: [
    {
      type: Types.ObjectId,
      ref: 'User',
      default: [],
    },
  ],
})

const MessageModel =
  (mongoose.models.Message as mongoose.Model<IMessages>) ||
  mongoose.model<IMessages>('Message', MessageSchema)

export { MessageModel, MessageSchema }
