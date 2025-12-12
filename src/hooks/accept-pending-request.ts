import React, { useRef, useState } from 'react'
import { useToggle } from 'react-use'
import * as z from 'zod'
import { acceptingMessageGuard, requestIdSchema } from '@/guards'
import { AcceptRequestFromOverallNetwork } from '@/services/accepting-requests-from-network'
import { ApiResponse, AuthStatus } from '@/types'

const useAcceptingRequest = () => {
  const [
    AcceptinMessageFromOverallNetworkResponse,
    setAcceptinMessageFromOverallNetworkResponse,
  ] = React.useState<AuthStatus>({
    error: '',
    success: '',
  })
  const [
    isAcceptingMessageFromOverallNetwork,
    setIsAcceptingMessagesFromOverallNetwork,
  ] = useToggle(false)

  const controllerForAcceptingPendingRequestFromOverallNetwork =
    useRef<AbortController | null>(null)

  const setError = (message: string) => {
    setAcceptinMessageFromOverallNetworkResponse((prev) => ({
      ...prev,
      success: '',
      error: message,
    }))
  }

  const setSuccess = (message: string) => {
    setAcceptinMessageFromOverallNetworkResponse((prev) => ({
      ...prev,
      success: message,
      error: '',
    }))
  }

  const acceptPendingRequestFromOverallNetwok = async (
    data: z.infer<typeof requestIdSchema>,
  ) => {
    setIsAcceptingMessagesFromOverallNetwork(true)
    if (controllerForAcceptingPendingRequestFromOverallNetwork.current) {
      controllerForAcceptingPendingRequestFromOverallNetwork.current.abort()
    }
    const controller = new AbortController()
    controllerForAcceptingPendingRequestFromOverallNetwork.current = controller
    const response = await AcceptRequestFromOverallNetwork({
      signal: controller.signal,
      requestId: data,
    })
    if (response.success) {
      setSuccess(response.message)
    } else {
      setError(response.message)
    }
    setIsAcceptingMessagesFromOverallNetwork(false)
  }

  return {
    AcceptinMessageFromOverallNetworkResponse,
    isAcceptingMessageFromOverallNetwork,
    acceptPendingRequestFromOverallNetwok,
  }
}

export { useAcceptingRequest }
