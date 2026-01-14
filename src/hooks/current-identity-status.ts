import React from 'react'
import { useToggle } from 'react-use'
import { getCurrentStatusForShowingIdentity } from '@/services'

const useIdentityStatus = () => {
  const [
    modeForGettingCurrentIdentityStatus,
    setModeForGettingCurrentIdentityStatus,
  ] = React.useState<boolean>(false)
  const [
    isLoadingForGettingCurrentIdentityStatus,
    setIsLoadingForGettingCurrentIdentityStatus,
  ] = useToggle(false)

  const controllerForGettingIsShowingIdentityCurrentStatus =
    React.useRef<AbortController | null>(null)

  const getCurrnetIdentityStatus = async () => {
    setIsLoadingForGettingCurrentIdentityStatus(true)
    if (controllerForGettingIsShowingIdentityCurrentStatus.current) {
      controllerForGettingIsShowingIdentityCurrentStatus.current.abort()
    }

    const controller = new AbortController()
    controllerForGettingIsShowingIdentityCurrentStatus.current = controller
    try {
      const response = await getCurrentStatusForShowingIdentity({
        signal: controller.signal,
      })
      if (response.success) {
        setModeForGettingCurrentIdentityStatus(response.mode)
      }
    } finally {
      setIsLoadingForGettingCurrentIdentityStatus(false)
    }
  }

  return {
    modeForGettingCurrentIdentityStatus,
    isLoadingForGettingCurrentIdentityStatus,
    getCurrnetIdentityStatus,
  }
}

export {useIdentityStatus}
