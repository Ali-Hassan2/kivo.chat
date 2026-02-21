import { z } from 'zod'
import { ObjectIdGuard } from './common.guard'

const participantsGuard = z.array(ObjectIdGuard)
const lastMessageGuard = ObjectIdGuard.optional()
const pinnedMessagesGuard = z.array(ObjectIdGuard).optional()

const conversationSchema = z.object({
  participants: participantsGuard,
  lastMessage: lastMessageGuard,
  pinnedMessages: pinnedMessagesGuard,
})

export { conversationSchema }
