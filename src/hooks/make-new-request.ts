import { useRef, useState } from 'react'
import { useToggle } from 'react-use'
import * as z from 'zod'
import { makeRequestGuard } from '@/guards'
import { MakeNetworkRequest } from '@/services'
import { AuthStatus } from '@/types'

const useNewRequest = () => {
  const [isSendingNewRequestOnNetwork, setIsSendingNewRequestOnNetwork] =
    useToggle(false)
  const [
    newRequestCreationResponseStatus,
    setNewRequestCreationResponseStatus,
  ] = useState<AuthStatus>({ success: '', error: '' })
  const [requestingRequestUserOnNetwork, setRequestingRequestUserOnNetwork] =
    useState<string>('')
  const setError = (message: string) => {
    setNewRequestCreationResponseStatus((prev) => ({
      success: '',
      error: message,
    }))
  }
  const setSuccess = (message: string) => {
    setNewRequestCreationResponseStatus((prev) => ({
      success: message,
      error: '',
    }))
  }
  const creatingNewRequestController = useRef<AbortController | null>(null)
  const sendingNewRequest = async (data: z.infer<typeof makeRequestGuard>) => {
    setRequestingRequestUserOnNetwork(data.username)
    setIsSendingNewRequestOnNetwork(true)
    setError('')
    setSuccess('')
    if (creatingNewRequestController.current) {
      creatingNewRequestController.current.abort()
    }
    const controller = new AbortController()
    creatingNewRequestController.current = controller
    const response = await MakeNetworkRequest({
      username: data.username,
      signal: controller.signal,
    })
    if (response.success) {
      setSuccess(response.message || 'Request Sent.')
    } else {
      setError(response.message || 'Request Not Sent.')
    }
    setIsSendingNewRequestOnNetwork(false)
    setRequestingRequestUserOnNetwork(null)
  }

  return {
    isSendingNewRequestOnNetwork,
    newRequestCreationResponseStatus,
    sendingNewRequest,
    requestingRequestUserOnNetwork,
  }
}

export { useNewRequest }
