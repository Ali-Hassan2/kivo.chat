import { Types } from 'mongoose'
import { z } from 'zod'

const requestIdSchema = z
  .string()
  .refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid ObjectId.',
  })

export { requestIdSchema }
