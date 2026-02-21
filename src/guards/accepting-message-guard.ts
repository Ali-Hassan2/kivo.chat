import { z } from 'zod'
import { ObjectIdGuard } from './common.guard'

const requestIdGuard = ObjectIdGuard

const acceptingMessageGuard = z.object({
  requestId: requestIdGuard,
})

export { acceptingMessageGuard }
