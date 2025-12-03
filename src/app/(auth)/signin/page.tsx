import React from 'react'
import * as z from zod 
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useForm } from 'react-hook-form'
import { signInGuard } from '@/guards'
import { zodResolver } from '@hookform/resolvers/zod'

const page = () => {
    const form = useForm<z.infer<typeof signInGuard>>({
        resolver: zodResolver(signInGuard),
        defaultValues:{
            ""
        }
    })
  return (
    <div className="flex h-[100vh] w-[100vw] items-center justify-center border-4 border-red-500 text-white">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Kivo Auth</CardTitle>
          <CardDescription>
            Login to your account with valid credentials.
          </CardDescription>
        </CardHeader>
        <CardContent>

        </CardContent>
      </Card>
    </div>
  )
}

export default page
