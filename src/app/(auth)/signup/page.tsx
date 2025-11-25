'use client'

import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { signUpGuard } from '@/guards'
import { useRegistration } from '@/hooks'

const page = () => {
  const {
    username,
    email,
    password,
    error,
    loading,
    usernameMessage,
    isCheckingUsername,
    setUsername,
    setEmail,
    setPassword,
    isUserNameIsUnique,
    submitting,
  } = useRegistration()

  const form = useForm<z.infer<typeof signUpGuard>>({
    resolver: zodResolver(signUpGuard),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      fullName: '',
    },
  })

  useEffect(() => {
    isUserNameIsUnique()
  }, [username])

  return <div></div>
}

export default page
