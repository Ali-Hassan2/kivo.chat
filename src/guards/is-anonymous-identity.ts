import * as z from 'zod'

const flagSchema = z.object({
  flag: z.boolean(),
})

export { flagSchema }
