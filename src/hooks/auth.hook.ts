'use client'

import { useState } from 'react'
import { signIn, SignInResponse } from 'next-auth/react'
import { useToggle } from 'react-use'
import * as z from 'zod'
import { signInGuard } from '@/guards'

interface AuthStatus {
  success: string
  error: string
}

const useAuth = () => {
  const [authSignInProcessLoading, setauthSignInProcessLoading] =
    useToggle(false)
  const [
    authProcessFinalizedStatusResposne,
    setAuthProcessFinalizedStatusResposne,
  ] = useState<AuthStatus>({
    success: '',
    error: '',
  })
  const setSuccess = (message: string) => {
    setAuthProcessFinalizedStatusResposne((prev) => ({
      ...prev,
      success: message,
      error: '',
    }))
  }
  const setError = (message: string) => {
    setAuthProcessFinalizedStatusResposne((prev) => ({
      ...prev,
      success: '',
      error: message,
    }))
  }
  const authProceed = async (data: z.infer<typeof signInGuard>) => {
    setError('')
    setSuccess('')
    setauthSignInProcessLoading(true)
    try {
      if (data.rememberMe) {
        localStorage.setItem('remembered', data.identifier)
      } else {
        localStorage.removeItem('remembered')
      }
      const response: SignInResponse | undefined = await signIn('credentials', {
        redirect: false,
        identifier: data.identifier,
        password: data.password,
      })
      if (!response?.ok) {
        setError(response?.error || 'Error occured while procceeding auth.')
      } else {
        setSuccess('Auth Procceeded, welcome.')
      }
    } catch (error: unknown) {
      let errorMessage = ''
      if (error instanceof Error) {
        errorMessage = error.message
      }
      if (typeof error === 'string') {
        errorMessage = error
      }
      setError(errorMessage)
    } finally {
      setauthSignInProcessLoading(false)
    }
  }
  return {
    authSignInProcessLoading,
    authProcessFinalizedStatusResposne,
    authProceed,
    setAuthProcessFinalizedStatusResposne,
  }
}

export { useAuth }
