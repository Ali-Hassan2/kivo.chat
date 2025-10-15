import { z } from 'zod'

const isAnonymousGuard = z.boolean().optional()

const changeModeGuard = z.object({
  isAon: isAnonymousGuard,
})

export { changeModeGuard }
