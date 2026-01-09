import * as z from 'zod'

const accmSchema = z.object({
  accm: z.boolean(),
})

export { accmSchema }
