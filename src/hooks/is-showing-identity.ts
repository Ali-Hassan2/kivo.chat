import { AuthStatus } from '@/types'
import React from 'react'
import { useToggle } from 'react-use'

const useIsShowingIdentity = () => {
  const [isShowingIdentityResponse, setIsShowingIdentityResponse] =
    React.useState<AuthStatus>({
      success: '',
      error: '',
    })
  const [isChangingModeForIdentity, setIsChangingModeForIdentity] =
    useToggle(false)

  const controllerForGettingchangedModeForIdentity =
    React.useRef<AbortController | null>(null)

  const setSuccess = (message: string) => {
    setIsShowingIdentityResponse((prev) => ({
      ...prev,
      success: message,
      error: '',
    }))
  }

  const setError = (message: string) => {
    setIsShowingIdentityResponse((prev) => ({
      ...prev,
      success: '',
      error: message,
    }))
  }

  const changeModeForNewIdentity = async()=>{
    
  }
}
