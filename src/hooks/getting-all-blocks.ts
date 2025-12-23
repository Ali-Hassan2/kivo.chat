import { useRef, useState } from 'react'
import { useToggle } from 'react-use'
import { getAllBlocks, GettingAllRequestStatuses } from '@/services'
import { AuthStatus } from '@/types'

const useGetAllBlocskOverAllNetwork = () => {
  const [isGettingBlocks, setIsGettingBlocks] = useToggle(false)
  const [
    ResponseForGettingBlocksOverallNetwork,
    setResposneForGEttingBlocksOverallNetwork,
  ] = useState<AuthStatus>({
    success: '',
    error: '',
  })

  const setSuccess = (message: string) => {
    setResposneForGEttingBlocksOverallNetwork((prev) => ({
      ...prev,
      success: message,
      error: '',
    }))
  }
  const setError = (message: string) => {
    setResposneForGEttingBlocksOverallNetwork((prev) => ({
      ...prev,
      success: '',
      error: message,
    }))
  }

  const controllerForGettingBlocksOverallNetwork =
    useRef<AbortController | null>(null)

  const getAllBlocksFromOverallNetwork = async () => {
    setError('')
    setSuccess('')
    setIsGettingBlocks(true)
    if (controllerForGettingBlocksOverallNetwork.current) {
      controllerForGettingBlocksOverallNetwork.current.abort()
    }
    const controller = new AbortController()
    controllerForGettingBlocksOverallNetwork.current = controller

    try {
      const response = await getAllBlocks({
        signal: controller.signal,
      })
      if (!response.success) {
        setError(response.message)
      } else {
        setSuccess(resposne.message)
      }
    } finally {
      setIsGettingBlocks(false)
    }
  }

  return {
    
  }
}
