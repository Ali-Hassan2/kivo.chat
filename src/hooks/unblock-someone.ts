import React, { useRef } from 'react'
import { useToggle } from 'react-use'
import * as z from 'zod'
import { unfriendSchema } from '@/guards'
import { unBlockSomeOne } from '@/services'
import { AuthStatus } from '@/types'

const useUnBlockSomeone = () => {
  const [
    isUnblockingSomeOneOverallNetwork,
    setIsUnblockingSomeOneOverallNetwork,
  ] = useToggle(false)
  const [unblockingSomeoneResponse, setUnblockingSomeoneResponse] =
    React.useState<AuthStatus | null>({
      success: '',
      error: '',
    })
  const controllerForGettingUnblockSomeone = useRef<AbortController | null>(
    null,
  )

  const setError = (message: string) => {
    setUnblockingSomeoneResponse((prev) => ({
      ...prev,
      success: '',
      error: message,
    }))
  }

  const setSuccess = (message: string) => {
    setUnblockingSomeoneResponse((prev) => ({
      ...prev,
      success: message,
      error: '',
    }))
  }

  const unblockSomeOneOverallNetwork = async (
    data: z.infer<typeof unfriendSchema>,
  ) => {
    setError('')
    setSuccess('')
    setIsUnblockingSomeOneOverallNetwork(true)
    if (controllerForGettingUnblockSomeone.current) {
      controllerForGettingUnblockSomeone.current.abort()
    }
    const controller = new AbortController()
    controllerForGettingUnblockSomeone.current = controller
    try {
      const response = await unBlockSomeOne({
        signal: controller.signal,
        username: data,
      })
      if (response.success) {
        setSuccess(response.message)
      } else {
        setError(response.message)
      }
    } finally {
      setIsUnblockingSomeOneOverallNetwork(false)
    }
  }

  return {
    isUnblockingSomeOneOverallNetwork,
    unblockingSomeoneResponse,
    unblockSomeOneOverallNetwork,
  }
}

export { useUnBlockSomeone }
