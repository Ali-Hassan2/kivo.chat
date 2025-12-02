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
import { signUpGuard } from '@/guards'

interface RegisterFormProps {
  form: UseFormReturn<z.infer<typeof signUpGuard>>
  onSubmit: (data: z.infer<typeof signUpGuard>) => Promise<void>
  onUsernameChange: (username: string) => void
  userNameAvailabilityMessage: string
  isCheckingUsernameUniqueness: string
  isSubmittingForm: string
}
const RegistrationFormForApp = ({
  form,
  onSubmit,
  onUsernameChange,
  userNameAvailabilityMessage,
  isCheckingUsernameUniqueness,
  isSubmittingForm,
}: RegisterFormProps) => {
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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
                <FormItem className="mt-2 flex flex-col gap-2">
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
                <FormItem className="mt-2 flex flex-col gap-2">
                  <FormLabel>FullName</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="You Fullname (...optional)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />
          <Button type="submit" disbaled={isSubmittingForm} className="mt-4">
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
    </>
  )
}

export { RegistrationFormForApp }
