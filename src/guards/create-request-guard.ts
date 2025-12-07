import { z } from 'zod'

const userNameConstraint = z.string()

const makeRequestGuard = z.object({
  username: userNameConstraint,
})

export { makeRequestGuard }
