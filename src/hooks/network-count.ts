import { useRef, useState } from 'react'
import { GetNetworkUser } from '@/services'
import { AuthStatus, NetworkLength } from '@/types'

const useNetworkCount = () => {
  const [userCountObtainedFromNetwork, setUserCountObtainedFromNetwork] =
    useState<NetworkLength>()
  const [isGettingUserNetworkCount, setIsGettingUserNetworkCount] =
    useState<boolean>(false)
  const [
    userCountResponseStatusForNetwork,
    setUserCountResponseStatusForNetwork,
  ] = useState<AuthStatus>({
    success: '',
    error: '',
  })

  const setError = (message: string) => {
    setUserCountResponseStatusForNetwork((prev) => ({
      ...prev,
      success: '',
      error: message,
    }))
  }

  const setSuccess = (message: string) => {
    setUserCountResponseStatusForNetwork((prev) => ({
      ...prev,
      success: message,
      error: '',
    }))
  }

  const currentControllerForGettingUserCount = useRef<AbortController | null>(
    null,
  )
  const gettingUserNetworkCount = async () => {
    if (currentControllerForGettingUserCount) {
      currentControllerForGettingUserCount.current?.abort()
    }
    const controller = new AbortController()
    currentControllerForGettingUserCount.current = controller

    setIsGettingUserNetworkCount(false)
    setError('')
    setSuccess('')

    const response = await GetNetworkUser({ signal: controller.signal })
    if (!response.success) {
      setError(response.message || 'Cannot fetch the network count')
      setIsGettingUserNetworkCount(false)
    } else {
      //   setUserCountObtainedFromNetwork(response.data.networkLength)
    }
  }
}
