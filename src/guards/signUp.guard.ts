import { z } from 'zod'

const usernameGuard = z
  .string()
  .trim()
  .regex(/^[a-zA-Z0-9]+$/, {
    message: 'Username should not have special characters.',
  })
  .min(4, { message: 'Username should be at least 4 characters long.' })
  .max(10, { message: 'Username can be up to 10 characters long.' })
const emailGuard = z.email({ message: 'Invalid email.' })
const passwordGuard = z
  .string()
  .min(4, { message: 'Password must be at least 4 characters long.' })
  .max(8, { message: 'Password can be at most 8 characters long.' })
  .regex(/[A-Z]/, {
    message: 'Password must contain at least one uppercase letter.',
  })
  .regex(/[a-z]/, {
    message: 'Password must contain at least one lowercase letter.',
  })
  .regex(/[0-9]/, { message: 'Password must contain at least one number.' })
const fullNameGuard = z
  .string()
  .min(3, { message: 'Full name must be at least 3 characters long.' })
  .max(20, { message: 'Full name can be up to 20 characters long.' })

const signUpGuard = z.object({
  username: usernameGuard,
  email: emailGuard,
  password: passwordGuard,
  fullname: fullNameGuard,
})

export { signUpGuard, usernameGuard }
