import * as z from 'zod'

const usernameSchemaTwo = z.string()
const receiverIdSchemaTwo = z.string()

const getUserSchema = z.object({
  username: usernameSchemaTwo,
  receiverId: receiverIdSchemaTwo,
})

export { getUserSchema }
