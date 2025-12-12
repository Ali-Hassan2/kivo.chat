import React, { useRef } from 'react'
import { useToggle } from 'react-use'
import * as z from 'zod'
import { requestIdSchema } from '@/guards'
import { RejectRequestForPendingOnOverallNetwork } from '@/services/reject-pending-request'
import { AuthStatus } from '@/types'

const useRequestRejection = () => {
  const [
    isCancelingRequestForOverallNetwork,
    setIsCancelingRequestForOverallNetwork,
  ] = useToggle(false)
  const [
    CancelingRequestForOverallNetworkResponse,
    setCancelingRequestForOverallNetworkResponse,
  ] = React.useState<AuthStatus>({
    success: '',
    error: '',
  })
  //   TODO: add SetError and SetSuccess.

  const setError = (message: string) => {
    setCancelingRequestForOverallNetworkResponse((prev) => ({
      ...prev,
      success: '',
      error: '',
    }))
  }

  const setSuccess = (message: string) => {
    setCancelingRequestForOverallNetworkResponse((prev) => ({
      ...prev,
      success: message,
      error: '',
    }))
  }
  const controllerForGettingRequestREjectionFromOverallNetwork =
    useRef<AbortController | null>(null)

  const rejectionRequest = async (data: z.infer<typeof requestIdSchema>) => {
    setIsCancelingRequestForOverallNetwork(true)
    setError('')
    setSuccess('')
    if (controllerForGettingRequestREjectionFromOverallNetwork.current) {
      controllerForGettingRequestREjectionFromOverallNetwork.current.abort()
    }
    const controller = new AbortController()
    controllerForGettingRequestREjectionFromOverallNetwork.current = controller
    const response = await RejectRequestForPendingOnOverallNetwork({
      signal: controller.signal,
      requestId: data,
    })
    if (response.success) {
      setSuccess(response.message)
    } else {
      setError(response.message)
    }
    setIsCancelingRequestForOverallNetwork(false)
  }
}

export { useRequestRejection }
