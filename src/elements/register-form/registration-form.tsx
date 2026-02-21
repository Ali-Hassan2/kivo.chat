'use client'

import React from 'react'
import { Loader2 } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { USERNAME_UNIQUENESS_SUCCESS } from '@/constants'
import { VERIFICATION_CODE } from '@/constants/page-urls'
import { signUpGuard } from '@/guards'
import { showToast, useNavigation } from '@/utils'

interface RegisterFormProps {
  form: UseFormReturn<z.infer<typeof signUpGuard>>
  onSubmit: (data: z.infer<typeof signUpGuard>) => Promise<any> | void
  onUsernameChange: (username: string) => void
  userNameAvailabilityMessage: string
  isCheckingUsernameUniqueness: boolean
  isSubmittingForm: boolean
}
const RegistrationFormForApp = ({
  form,
  onSubmit,
  onUsernameChange,
  userNameAvailabilityMessage,
  isCheckingUsernameUniqueness,
  isSubmittingForm,
}: RegisterFormProps) => {
  const { navigateTo } = useNavigation()
  const handleSubmit = async (data: z.infer<typeof signUpGuard>) => {
    if (userNameAvailabilityMessage !== USERNAME_UNIQUENESS_SUCCESS) {
      showToast(userNameAvailabilityMessage, 'error')
      return
    }
    const result = await onSubmit(data)
    if (result?.success && result.message) {
      showToast(result.message, 'success')
      setTimeout(() => {
        navigateTo(`${VERIFICATION_CODE}?username=${data.username}`)
      }, 2000)
    } else if (!result?.success && result?.message) {
      showToast(result.message, 'error')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          name="username"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem className="flex flex-col gap-3">
                <FormLabel className="">Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Username"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e)
                      onUsernameChange(e.target.value)
                    }}
                    className="outline-none"
                  />
                </FormControl>
                <div className="-mt-1 mb-3">
                  {isCheckingUsernameUniqueness && (
                    <Loader2 className="animate-spin" />
                  )}
                  <p
                    className={`${userNameAvailabilityMessage === USERNAME_UNIQUENESS_SUCCESS ? 'text-green-500' : 'text-red-500'}`}
                  >
                    {userNameAvailabilityMessage}
                  </p>
                </div>
                <FormMessage />
              </FormItem>
            )
          }}
        />
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem className="flex flex-col gap-2">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
        />
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem className="mt-5 flex flex-col gap-2">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Password here"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
        />
        <FormField
          name="fullName"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem className="mt-5 flex flex-col gap-2">
                <FormLabel>FullName</FormLabel>
                <FormControl>
                  <Input placeholder="You Fullname (...optional)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
        />
        <Button
          type="submit"
          disabled={isSubmittingForm}
          className="mt-6 w-full cursor-pointer rounded-3xl py-6"
        >
          {isSubmittingForm ? (
            <>
              <Loader2 className="animate-spin" />
              submitting
            </>
          ) : (
            <p>Register</p>
          )}
        </Button>
      </form>
    </Form>
  )
}

export { RegistrationFormForApp }
