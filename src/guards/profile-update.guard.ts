import { z } from 'zod'
import { fileUploadGuard } from './file-upload.guard'

const bioGuard = z
  .string()
  .trim()
  .min(1, { message: 'Bio must be 1 character long.' })
  .max(100, { message: 'Bio can only be 100 characters long.' })
const pfpGuard = fileUploadGuard
const coverImageGuard = fileUploadGuard

const profileGuard = z.object({
  bio: bioGuard,
  pfp: pfpGuard.optional(),
  coverImage: coverImageGuard.optional(),
})

export { profileGuard }
