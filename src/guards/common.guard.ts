import { z } from 'zod'

const ObjectIdGuard = z.string().regex(/^[0-9a-fA-F]{24}$/, {
  message: 'Invalid ObjectId',
})

export { ObjectIdGuard }
