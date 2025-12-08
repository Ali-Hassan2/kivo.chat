import { useRef, useState } from 'react'

const useNetworkCount = () => {
  const [userCountObtainedFromNetwork, setUserCountObtainedFromNetwork] =
    useState<number>(0)
  const [isGettingUserNetworkCount, setIsGettingUserNetworkCount] =
    useState<boolean>(false)

  const currentControllerForGettingUserCount = useRef<AbortController | null>(
    null,
  )
  const gettingUserNetworkCount = () => {
    if (currentControllerForGettingUserCount) {
      currentControllerForGettingUserCount.current?.abort()
    }
    const controller = new AbortController()
    currentControllerForGettingUserCount.current = controller

    setIsGettingUserNetworkCount(false)

    const response = await 
  }
}
