import { z } from 'zod'

const fullNameSchema = z.string({
  message: 'Must be a string value',
})
const usernameSchema = z.string({
  message: 'Must be a string value',
})
const emailSchema = z.string({
  message: 'Must be a string value',
})
const bioSchema = z.string({
  message: 'Must be a string value',
})

const fakeProfileSchema = z.object({
  fullName: fullNameSchema,
  username: usernameSchema,
  email: emailSchema,
  bio: bioSchema,
})

export { fakeProfileSchema }
