import { useRef, useState } from 'react'
import { useToggle } from 'react-use'
import * as z from 'zod'
import { anotherIdentitySchema } from '@/guards'
import { createNewProfileFake } from '@/services'
import { AuthStatus } from '@/types'

const useCreateNewProfile = () => {
  const [newProfileCreationResponse, setNewProfileCretaionResponse] =
    useState<AuthStatus>({
      success: '',
      error: '',
    })

  const [isCreatingNewProfile, toggleIsCreatingProfile] = useToggle(false)

  const controllerForCreatingNewProfileOnOverallNetwork =
    useRef<AbortController | null>(null)

  const setSuccess = (message: string) => {
    setNewProfileCretaionResponse((prev) => ({
      ...prev,
      success: message,
      error: '',
    }))
  }

  const setError = (message: string) => {
    setNewProfileCretaionResponse((prev) => ({
      ...prev,
      success: '',
      error: message,
    }))
  }

  const createNewProfile = async (
    data: z.infer<typeof anotherIdentitySchema>,
  ) => {
    if (controllerForCreatingNewProfileOnOverallNetwork.current) {
      controllerForCreatingNewProfileOnOverallNetwork.current.abort()
    }
    const controller = new AbortController()
    controllerForCreatingNewProfileOnOverallNetwork.current = controller
    try {
      toggleIsCreatingProfile(true)
      await new Promise((resolve) => setTimeout(resolve, 2000))
      const response = await createNewProfileFake({
        username: data.username,
        email: data.email,
        fullName: data.fullName,
        bio: data.bio,
        signal: controller.signal,
      })
      if (response.success) {
        setSuccess(response.message)
      } else {
        setError(response.message)
      }
    } finally {
      toggleIsCreatingProfile(false)
    }
  }

  return {
    isCreatingNewProfile,
    newProfileCreationResponse,
    createNewProfile,
  }
}

export { useCreateNewProfile }
