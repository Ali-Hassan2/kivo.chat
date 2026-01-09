import React, { useState } from 'react'
import { useToggle } from 'react-use'
import * as z from 'zod'
import { accmSchema } from '@/guards'
import { modeIsAcceptingMessages } from '@/services'
import { AuthStatus } from '@/types'

const useAcceptingMessagesMode = () => {
  const [
    isAcceptingMessagesResponseOverallNetwork,
    setIsAcceptingMessagesResponseOverallNetwork,
  ] = useState<AuthStatus>({
    success: '',
    error: '',
  })

  const [isTogglingIsAcceptingMessages, setIsTogglingIsAcceptingMessages] =
    useToggle(false)

  const controllerForIsAcceptingMessagesOverallNetwork =
    React.useRef<AbortController | null>(null)
  const setSuccess = (message: string) => {
    setIsAcceptingMessagesResponseOverallNetwork((prev) => ({
      ...prev,
      success: message,
      error: '',
    }))
  }

  const setError = (message: string) => {
    setIsAcceptingMessagesResponseOverallNetwork((prev) => ({
      ...prev,
      error: message,
      success: '',
    }))
  }

  const changeModeToAcceptingMessages = async (
    data: z.infer<typeof accmSchema>,
  ) => {
    setSuccess('')
    setError('')
    setIsTogglingIsAcceptingMessages(true)
    if (controllerForIsAcceptingMessagesOverallNetwork.current) {
      controllerForIsAcceptingMessagesOverallNetwork.current.abort()
    }
    const controller = new AbortController()
    controllerForIsAcceptingMessagesOverallNetwork.current = controller

    try {
      const response = await modeIsAcceptingMessages({
        accm: data,
        signal: controller.signal,
      })
      if (response.success) {
        setSuccess(response.message)
      } else {
        setError(response.message)
      }
    } finally {
      setIsTogglingIsAcceptingMessages(false)
    }
  }

  return {
    isAcceptingMessagesResponseOverallNetwork,
    isTogglingIsAcceptingMessages,
    changeModeToAcceptingMessages,
  }
}

export { useAcceptingMessagesMode }
