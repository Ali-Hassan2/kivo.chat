'use client'

import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useDebounceCallback } from 'usehooks-ts'
import * as z from 'zod'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { RegistrationFormForApp } from '@/elements'
import { signUpGuard } from '@/guards'
import { useRegistration } from '@/hooks'

const page = () => {
  const {
    userChosenUsernameForRegistrationPurpose,
    setUserChosenUsernameForRegistrationPurpose,
    checkIfUserChosenUsernameIsUniqueForRegistration,
    submitUserRegistrationFormWithFullData,
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

  const debouncedCheckUsername = useDebounceCallback((username: string) => {
    setUserChosenUsernameForRegistrationPurpose(username)
    if (username.trim().length > 1) {
      checkIfUserChosenUsernameIsUniqueForRegistration()
    }
  }, 1000) // 1 second debounce

  return (
    <>
      <div className="flex h-[100vh] w-full items-center justify-center border-4 border-red-400">
        <Card className="flex w-full max-w-md flex-col items-center justify-center">
          <CardHeader className="flex w-full flex-col items-center justify-center border-4 text-center">
            <CardTitle>
              <Label className="text-3xl">Member Registration.</Label>
            </CardTitle>
            <CardDescription>
              Provide the required information to create a new account on kivo.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RegistrationFormForApp
              form={form}
              onSubmit={submitUserRegistrationFormWithFullData}
              onUsernameChange={debouncedCheckUsername}
            />
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default page
