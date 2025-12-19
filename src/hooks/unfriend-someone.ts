import { useRef, useState } from 'react'
import { useToggle } from 'react-use'
import * as z from 'zod'
import { requestIdSchema, unfriendSchema } from '@/guards'
import { UnfriendSomeone } from '@/services'
import { AuthStatus } from '@/types'

const useUnfriendSomeOneOverallNetwork = () => {
  const [isUnfriendingRequest, setIsUnfriendingRequest] = useToggle(false)
  const [
    UnfriendSomeoneOverallNetworkResponse,
    setUnfriendSomeoneResponseOverallNetwork,
  ] = useState<AuthStatus>({
    success: '',
    error: '',
  })
  const controllerForUnfriendSomeoneOverallNetwork =
    useRef<AbortController | null>(null)

  const setError = (message: string) => {
    setUnfriendSomeoneResponseOverallNetwork((prev) => ({
      ...prev,
      success: '',
      error: message,
    }))
  }
  const setSuccess = (message: string) => {
    setUnfriendSomeoneResponseOverallNetwork((prev) => ({
      ...prev,
      success: message,
      error: '',
    }))
  }
  const unfriendSomeoneOnOverallNetwork = async (
    data: z.infer<typeof unfriendSchema>,
  ) => {
    setSuccess('')
    setError('')
    setIsUnfriendingRequest(true)
    if (controllerForUnfriendSomeoneOverallNetwork.current) {
      controllerForUnfriendSomeoneOverallNetwork.current.abort()
    }

    const controller = new AbortController()
    controllerForUnfriendSomeoneOverallNetwork.current = controller

    try {
      const response = await UnfriendSomeone({
        signal: controller.signal,
        userId: data,
      })

      console.log('The unfriend response= ', response)
      if (!response.success) {
        setError(response.message)
      } else {
        setSuccess(response.message)
      }
    } finally {
      setIsUnfriendingRequest(false)
    }
  }

  return {
    isUnfriendingRequest,
    UnfriendSomeoneOverallNetworkResponse,
    unfriendSomeoneOnOverallNetwork,
  }
}

export { useUnfriendSomeOneOverallNetwork }
