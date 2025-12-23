import { useRef, useState } from 'react'
import { useToggle } from 'react-use'
import * as z from 'zod'
import { AuthStatus } from '@/types'
import { requestIdSchema } from '@/guards'

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
    try {
        
    } catch (error) {
        
    }
  }
}
