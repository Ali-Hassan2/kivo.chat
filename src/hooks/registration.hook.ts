import { useRef, useState } from 'react'
import { useToggle } from 'react-use'
import * as z from 'zod'
import { signUpGuard } from '@/guards'
import { getUserNameUniqueness } from '@/services'
import { createNewUser } from '@/services/sign-up.service'

export const useRegistration = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [error, setError] = useState('')
  const [usernameMessage, setUsernameMessage] = useState('')
  const [loading, toggleLoading] = useToggle(false)
  const [isCheckingUsername, toggleCheckingUsername] = useToggle(false)
  const [submitting, toggleSubmitting] = useToggle(false)
  const controllerRef = useRef<AbortController | null>(null)

  const isUserNameIsUnique = async () => {
    if (controllerRef.current) {
      controllerRef.current.abort()
    }
    const controller = new AbortController()
    controllerRef.current = controller
    setError('')
    toggleCheckingUsername(true)
    setUsernameMessage('')
    const result = await getUserNameUniqueness({
      username,
      signal: controller.signal,
    })
    toggleCheckingUsername(false)
    if (!result.success) {
      setError(result.message || result.error || 'Unknown Error')
    } else {
      setUsernameMessage(result.message)
    }
  }

  const Register = async (data: z.infer<typeof signUpGuard>) => {
    if (controllerRef.current) {
      controllerRef.current.abort()
    }
    const controller = new AbortController()
    controllerRef.current = controller
    setError('')
    toggleSubmitting(true)
    const result = await createNewUser({
      username: data.username,
      email: data.email,
      password: data.password,
      fullName: data.fullName,
      signal: controller.signal,
    })
    toggleSubmitting(false)
    if (!result.success) {
      setError(result.message || result.error || 'Unknown Error')
    }
    return result
  }

  return {
    username,
    email,
    password,
    fullName,
    error,
    usernameMessage,
    loading,
    isCheckingUsername,
    submitting,
    setUsername,
    setFullName,
    setEmail,
    setPassword,
    isUserNameIsUnique,
    Register,
  }
}
