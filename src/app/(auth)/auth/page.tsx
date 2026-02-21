'use client'

import React, { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { AuthForm } from '@/elements'
import { signInGuard } from '@/guards'
import { useAuth } from '@/hooks/auth.hook'

export default function AuthPage() {
  const form = useForm<z.infer<typeof signInGuard>>({
    resolver: zodResolver(signInGuard),
    defaultValues: {
      identifier: '',
      password: '',
      rememberMe: false,
    },
  })

  const {
    authSignInProcessLoading,
    authProcessFinalizedStatusResposne,
    authProceed,
    setAuthProcessFinalizedStatusResposne,
  } = useAuth()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedAuthMember = localStorage.getItem('remebered')
      if (savedAuthMember) {
        form.setValue('identifier', savedAuthMember)
        form.setValue('rememberMe', false)
      }
    }
  }, [form])

  return (
    <div className="flex h-[100vh] w-[100vw] items-center justify-center bg-white text-white shadow-lg">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Kivo Auth</CardTitle>
          <CardDescription>
            Login to your account with valid credentials.
          </CardDescription>
          <div className="w-4/5 border-1"></div>
        </CardHeader>
        <CardContent>
          <AuthForm
            form={form}
            onSubmit={authProceed}
            authProcessResponseStatus={authProcessFinalizedStatusResposne}
            authProcessLoadingState={authSignInProcessLoading}
          />
        </CardContent>
      </Card>
    </div>
  )
}
