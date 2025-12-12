import { z } from 'zod'

const requestIdGuard = z.string()

const acceptingMessageGuard = z.object({
  requestId: requestIdGuard,
})

export { acceptingMessageGuard }
