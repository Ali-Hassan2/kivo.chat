import { z } from 'zod'

const verificationCodeGuard = z
  .string()
  .min(6, { message: 'Verification Code must b 6 digits long' })
  .max(6, { message: 'Verification Code must b 6 digits long.' })

const verifyCodeSchema = z.object({
  verficationCode: verificationCodeGuard,
})

export { verifyCodeSchema }
