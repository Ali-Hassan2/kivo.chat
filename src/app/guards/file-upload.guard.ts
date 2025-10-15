import { z } from 'zod'

const fileUploadGuard = z.object({
  url: z.url({ message: 'Invalid URL.' }),
  publicId: z.string({ message: 'Invalid PublicId.' }),
})

export { fileUploadGuard }
