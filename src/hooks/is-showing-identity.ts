import React from 'react'
import { useToggle } from 'react-use'
import * as z from 'zod'
import { flagSchema } from '@/guards'
import { isShowingIdentity } from '@/services'
import { AuthStatus } from '@/types'

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

  const changeModeForNewIdentity = async (data: z.infer<typeof flagSchema>) => {
    setSuccess('')
    setError('')
    setIsChangingModeForIdentity(true)
    try {
      if (controllerForGettingchangedModeForIdentity.current) {
        controllerForGettingchangedModeForIdentity.current.abort()
      }
      const controller = new AbortController()
      const response = await isShowingIdentity({
        signal: controller.signal,
        flag: data.flag,
      })
      if (response.success) {
        setSuccess(response.message)
      } else {
        setError(response.message)
      }
    } finally {
      setIsChangingModeForIdentity(false)
    }
  }
  return {
    isShowingIdentityResponse,
    isChangingModeForIdentity,
    changeModeForNewIdentity,
  }
}

export { useIsShowingIdentity }
