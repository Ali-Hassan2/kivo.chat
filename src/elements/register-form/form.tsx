import React from 'react'
import { Loader2 } from 'lucide-react'
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
  const { debounced, isCheckingUsername, usernameMessage } = useRegistration()
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
                  {isCheckingUsername && <Loader2 className="animate-spin" />}
                  <p
                    className={`${usernameMessage === 'Username is available.' ? 'text-green-500' : 'text-red-500'}`}
                  >
                    {usernameMessage}
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
