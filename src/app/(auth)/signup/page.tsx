'use client'

import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { signUpGuard } from '@/guards'
import { useRegistration } from '@/hooks'

const page = () => {
  const {
    userChosenUsernameForRegistrationPurpose,
    checkIfUserChosenUsernameIsUniqueForRegistration,
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
    if (userChosenUsernameForRegistrationPurpose.trim().length > 1) {
      checkIfUserChosenUsernameIsUniqueForRegistration()
    }
  }, [userChosenUsernameForRegistrationPurpose])

  return (
    <>
      <div className="h-[100vh] w-full border-4 border-red-400">
        <Card
      </div>
    </>
  )
}

export default page
