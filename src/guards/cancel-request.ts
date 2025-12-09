import { z } from 'zod'

const requestIdGuard = z.string()

const cancelRequestSchema = z.object({
  requestId: requestIdGuard,
})

export { cancelRequestSchema }
