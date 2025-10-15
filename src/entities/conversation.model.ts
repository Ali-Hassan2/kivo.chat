import mongoose, { Document, Schema, Types } from 'mongoose'
import { IMessages } from './message.model'
import { IUser } from './user.model'

export interface IConversation extends Document {
  participants: (Types.ObjectId | IUser)[]
  lastMessage: Types.ObjectId | IMessages
  pinnedMessages: (Types.ObjectId | IMessages)[]
}

const ConversationSchema: Schema<IConversation> = new Schema({
  participants: [
    {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
  ],
  lastMessage: {
    type: Types.ObjectId,
    ref: 'Message',
  },
  pinnedMessages: [
    {
      type: Types.ObjectId,
      ref: 'Message',
      default: [],
    },
  ],
})

const ConversationModel =
  (mongoose.models.Conversation as mongoose.Model<IConversation>) ||
  mongoose.model<IConversation>('Conversation', ConversationSchema)

export { ConversationModel }
