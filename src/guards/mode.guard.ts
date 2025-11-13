import { z } from 'zod'

const isAcceptingMessagesGuard = z.boolean()

const modeAcceptingMessages = z.object({
  isAcceptingMessages: isAcceptingMessagesGuard,
})

export { modeAcceptingMessages }
