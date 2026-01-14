import React from 'react'
import { useToggle } from 'react-use'
import { getStatusForIsAcceptingMessages } from '@/services'

const useGetCurrentIsAcceptingMessagesStatus = async () => {
  const [
    CurrentStatusForIsAcceptingMessages,
    setCurrentStatusForIsAcceptingMessages,
  ] = React.useState<boolean>(false)
  const [
    isLoadingGettingStatusCurrentForIsAcceptingMessages,
    setIsLoadingGettingStatusCurrentForIsAcceptingMessages,
  ] = useToggle(false)
  const controlllerForGettingCurrentStatus =
    React.useRef<AbortController | null>(null)
  const useGetCurrentStatusForIsAcceptingMessages = async () => {
    setIsLoadingGettingStatusCurrentForIsAcceptingMessages(true)
    if (controlllerForGettingCurrentStatus.current) {
      controlllerForGettingCurrentStatus.current.abort()
    }
    const controller = new AbortController()
    controlllerForGettingCurrentStatus.current = controller
    try {
      const response = await getStatusForIsAcceptingMessages({
        signal: controller.signal,
      })
      if (response.success) {
        setCurrentStatusForIsAcceptingMessages(response.mode)
      }
    } finally {
      setIsLoadingGettingStatusCurrentForIsAcceptingMessages(false)
    }
  }

  return {
    CurrentStatusForIsAcceptingMessages,
    isLoadingGettingStatusCurrentForIsAcceptingMessages,
    useGetCurrentStatusForIsAcceptingMessages,
  }
}

export { useGetCurrentIsAcceptingMessagesStatus }
