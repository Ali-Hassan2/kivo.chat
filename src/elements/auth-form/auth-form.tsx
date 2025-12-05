'use client'

import React, { useEffect } from 'react'
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
import { Label } from '@/components/ui/label'
import { PERSONAL_BOARD } from '@/constants'
import { signInGuard } from '@/guards'
import { AuthStatus } from '@/types'
import { showToast, useNavigation } from '@/utils'
import { cn } from '@/utils/cn'

interface authFormProps {
  form: UseFormReturn<z.infer<typeof signInGuard>>
  onSubmit: (data: z.infer<typeof signInGuard>) => void
  authProcessResponseStatus: AuthStatus
  authProcessLoadingState: boolean
}

const AuthForm = ({
  form,
  onSubmit,
  authProcessResponseStatus,
  authProcessLoadingState,
}: authFormProps) => {
  const { navigateTo } = useNavigation()
  useEffect(() => {
    if (authProcessResponseStatus.success) {
      const successMessage = authProcessResponseStatus.success
      showToast(successMessage, 'success')
      setTimeout(() => {
        navigateTo(PERSONAL_BOARD)
      },2000)
    }
    if (authProcessResponseStatus.error) {
      const errorMessage = authProcessResponseStatus.error
      showToast(errorMessage, 'error')
    }
  }, [authProcessResponseStatus])
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="identifier"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem className="flex flex-col gap-4">
                <FormLabel className="pl-1">Email/Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Identifier here...."
                    {...field}
                    className={cn('bg-transparent')}
                  />
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
              <FormItem>
                <FormLabel className="mt-3">Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="password here..."
                    {...field}
                    className="py-6"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
        />
        <FormField
          name="rememberMe"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem className="mt-4 flex gap-2">
                <FormControl>
                  <input
                    type="checkbox"
                    className="w-4 rounded-md"
                    id="remeberMe"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    disabled={authProcessLoadingState}
                  />
                </FormControl>
                <FormLabel htmlFor="remeberMe">Remeber Me</FormLabel>
              </FormItem>
            )
          }}
        />
        <Button
          type="submit"
          disabled={authProcessLoadingState}
          className="mt-4 w-full cursor-pointer rounded-3xl py-5"
        >
          {authProcessLoadingState ? (
            <Loader2 className="animate-spin" />
          ) : (
            <Label>Login</Label>
          )}
        </Button>
      </form>
    </Form>
  )
}

export { AuthForm }
