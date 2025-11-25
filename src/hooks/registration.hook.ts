import { useRef, useState } from 'react'
import { useToggle } from 'react-use'
import { getUserNameUniqueness } from '@/services'
import * as z from 'zod'
import { signUpGuard } from '@/guards'

const useRegistration = () => {
  const [username, setUsername] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [fullName, setFullName] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [usernameMessage, setUsernameMessage] = useState<string>('')
  const [loading, setLoading] = useToggle(false)
  const [isCheckingUsername, setIsCheckingUsername] = useToggle(false)
  const [submitting, setIsSubmitting] = useToggle(false)
  const controllerRef = useRef<AbortController | null>(null)

  const isUserNameIsUnique = async () => {
    if (controllerRef.current) {
      controllerRef.current.abort()
    }
    const controller = new AbortController()
    controllerRef.current = controller
    setError('')
    setIsCheckingUsername(true)
    setUsernameMessage('')
    const result = await getUserNameUniqueness({
      username,
      signal: controller.signal,
    })
    if (!result.success) {
      setError(result.message || result.error || 'Unknown Error')
    } else {
      setUsernameMessage(result.message)
    }
  }

  const Register = aync(data: z.infer<typeof signUpGuard>)=>{
    try {
        
    } catch (error) {
        
    }
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
    setUsername,
    setFullName,
    setEmail,
    setPassword,
    isUserNameIsUnique,
  }
}

export { useRegistration }
