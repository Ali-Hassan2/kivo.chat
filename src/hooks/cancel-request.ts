import { useRef, useState } from 'react'
import { useToggle } from 'react-use'
import * as z from 'zod'
import { cancelRequestSchema } from '@/guards'
import { CancelRequestForPendingRequest } from '@/services'
import { AuthStatus } from '@/types'

const useCancelRequest = () => {
  const [
    cancelRequestForPendingRequestOnNetwork,
    setCancelRequestForPendingRequestOnNetwork,
  ] = useState<AuthStatus>({
    success: '',
    error: '',
  })
  const [
    isCancellingRequestInPendingRequestOnNetwork,
    setIsCancellingRequestInPendingRequestOnNetwork,
  ] = useToggle(false)
  const controllerForCancellingRequestForPendingRequestOnNetwork =
    useRef<AbortController | null>(null)

  const setError = (message: string) => {
    setCancelRequestForPendingRequestOnNetwork((prev) => ({
      ...prev,
      success: '',
      error: message,
    }))
  }
  const setSuccess = (message: string) => {
    setCancelRequestForPendingRequestOnNetwork((prev) => ({
      ...prev,
      success: message,
      error: '',
    }))
  }

  const cancelRequestOnNetwork = async (
    data: z.infer<typeof cancelRequestSchema>,
  ) => {
    setIsCancellingRequestInPendingRequestOnNetwork(true)
    setError('')
    setSuccess('')
    if (controllerForCancellingRequestForPendingRequestOnNetwork.current) {
      controllerForCancellingRequestForPendingRequestOnNetwork.current.abort()
    }
    const controller = new AbortController()
    controllerForCancellingRequestForPendingRequestOnNetwork.current =
      controller
    const response = await CancelRequestForPendingRequest({
      signal: controller.signal,
      requestId: data.requestId,
    })
    if (response.success) {
      setSuccess(response.message)
    } else {
      setError(response.message)
    }
    setIsCancellingRequestInPendingRequestOnNetwork(false)
  }

  return {
    cancelRequestForPendingRequestOnNetwork,
    isCancellingRequestInPendingRequestOnNetwork,
    cancelRequestOnNetwork,
  }
}

export { useCancelRequest }
