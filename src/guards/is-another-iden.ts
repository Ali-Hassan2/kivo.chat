import { z } from 'zod'

const usernameSchema = z.string()

const emailSchema = z.string()

const fullNameSchema = z.string()

const bioSchema = z.string()

const anotherIdentitySchema = z.object({
  username: usernameSchema,
  email: emailSchema,
  fullName: fullNameSchema,
  bio: bioSchema,
})

export { anotherIdentitySchema }
