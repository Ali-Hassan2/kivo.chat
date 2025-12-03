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

  const authProceed = async (data: z.infer<typeof signInGuard>) => {
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
    console.log('The ====response,', response)
  }
}
