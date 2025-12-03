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
import { signInGuard } from '@/guards'

const page = () => {
  const form = useForm<z.infer<typeof signInGuard>>({
    resolver: zodResolver(signInGuard),
    defaultValues: {
      identifier: '',
      password: '',
      rememberMe: false,
    },
  })

  useEffect(() => {
    const savedAuthMember = localStorage.getItem('remebered')
    if (savedAuthMember) {
      form.setValue('identifier', savedAuthMember)
      form.setValue('rememberMe', false)
    }
  }, [form])
  return (
    <div className="flex h-[100vh] w-[100vw] items-center justify-center border-4 border-red-500 text-white">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Kivo Auth</CardTitle>
          <CardDescription>
            Login to your account with valid credentials.
          </CardDescription>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    </div>
  )
}

export default page
