import React from 'react'
import { Loader2 } from 'lucide-react'
import { useDebounceCallback } from 'usehooks-ts'
import * as z from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { signUpGuard } from '@/guards'
import { useRegistration } from '@/hooks'

interface RegisterFormProps {
  form: z.infer<typeof signUpGuard>
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}
const form = ({ form, onSubmit }: RegisterFormProps) => {
  const {
    userChosenUsernameForRegistrationPurpose,
    usernameAvailabilityMessageForRegistrationProcess,
    isUsernameBeingCheckedForAvailabilityDuringRegistrationProcess,
  } = useRegistration()
  const debounced = useDebounceCallback(
     as any,
    3000,
  )
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name="username"
            control={form.control}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Username"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e)
                        debounced(e.target.value)
                      }}
                    />
                  </FormControl>
                  {isUsernameBeingCheckedForAvailabilityDuringRegistrationProcess && (
                    <Loader2 className="animate-spin" />
                  )}
                  <p
                    className={`${usernameMessage === 'Username is available.' ? 'text-green-500' : 'text-red-500'}`}
                  >
                    {usernameAvailabilityMessageForRegistrationProcess}
                  </p>
                  <FormMessage />
                </FormItem>
              )
            }}
          />
        </form>
      </Form>
    </>
  )
}

export default form
