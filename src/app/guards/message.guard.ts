import { z } from 'zod'
import { ObjectIdGuard } from './common.guard'
import { fileUploadGuard } from './file-upload.guard'

const senderGuard = ObjectIdGuard
const receiverGuard = ObjectIdGuard
const contentGuard = z
  .string()
  .min(1, { message: 'Message should contain atleast 1 character' })
  .max(200, { message: 'Message can only be 200 chars long.' })
const conversationGuard = ObjectIdGuard
const isAnonGuard = z.boolean().optional()
const readByGuard = z.array(ObjectIdGuard).optional().default([])
const attachmentsArrayGuard = z.array(fileUploadGuard).optional().default([])

const messageGuard = z.object({
  sender: senderGuard,
  receiver: receiverGuard,
  content: contentGuard,
  isAnon: isAnonGuard,
  conversation: conversationGuard,
  readBy: readByGuard,
  attachments: attachmentsArrayGuard,
})

export { messageGuard }
