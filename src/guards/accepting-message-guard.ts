import {z} from zodResolver

const requestIdGuard = z.string()

const acceptingMessageGuard = z.object({
    requestId: requestIdGuard
})

export {acceptingMessageGuard}