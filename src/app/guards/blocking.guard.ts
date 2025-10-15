import { z } from 'zod'
import { ObjectIdGuard } from './common.guard'

const blockingUser = ObjectIdGuard

const blockingGuard = z.object({
  blocked: blockingUser,
})

export { blockingUser }
