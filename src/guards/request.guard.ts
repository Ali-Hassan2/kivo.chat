import { z } from 'zod'
import { ObjectIdGuard } from './common.guard'

const fromGuard = ObjectIdGuard

const requestSchema = z.object({
  from: fromGuard,
})

export { requestSchema }
