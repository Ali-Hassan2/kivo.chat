import { useRef, useState } from 'react'
import { useToggle } from 'react-use'
import * as z from 'zod'
import { requestIdSchema } from '@/guards'
import { blockSomeone } from '@/services'
import { AuthStatus } from '@/types'

const useBlockSomeone = () => {
  const [isBlockingSomeone, setIsBlockingSomeone] = useToggle(false)
  const [BlockSomeoneResponse, setBlockSomeoneResponse] =
    useState<AuthStatus | null>({
      success: '',
      error: '',
    })

  const setSuccess = (message: string) => {
    setBlockSomeoneResponse((prev) => ({
      ...prev,
      success: message,
      error: '',
    }))
  }
  const setError = (message: string) => {
    setBlockSomeoneResponse((prev) => ({
      ...prev,
      success: '',
      error: message,
    }))
  }

  const controllerForBlockingSomeoneOverallNetwork =
    useRef<AbortController | null>(null)

  const doBlockSomeone = async (data: z.infer<typeof requestIdSchema>) => {
    setError('')
    setSuccess('')
    setIsBlockingSomeone(true)
    if (controllerForBlockingSomeoneOverallNetwork.current) {
      controllerForBlockingSomeoneOverallNetwork.current.abort()
    }
    const controller = new AbortController()
    controllerForBlockingSomeoneOverallNetwork.current = controller
    try {
      const response = await blockSomeone({
        requestId: data,
        signal: controller.signal,
      })
      if (!response.success) {
        setError(response.message)
      } else {
        setSuccess(response.message)
      }
    } finally {
      setIsBlockingSomeone(false)
    }
  }
  return {
    isBlockingSomeone,
    BlockSomeoneResponse,
    doBlockSomeone,
  }
}

export { useBlockSomeone }
