import { useState } from 'react'
import { Button } from '@react-email/components'
import { UseFormReturn } from 'react-hook-form'
import * as z from 'zod'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { verifyCodeSchema } from '@/guards'

interface VerificationFormProps {
  form: UseFormReturn<z.infer<typeof verifyCodeSchema>>
  onSubmit: (data: z.infer<typeof verifyCodeSchema>) => Promise<any> | void
  verifyingProcessMessage: string
  isVerifyingCode: boolean
  verifyProcessError: string
}

const Verification = () => {
  return (
    <div className="flex h-[100vh] w-[100vw] items-center justify-center border-4 border-red-500">
      <Card className="w-100">
        <CardHeader>
          <CardTitle className="mx-auto text-2xl">Kivo Verification</CardTitle>
          <CardDescription className="mt-2">
            Please check your provided mail to get the code. Enter the valid
            code to proceed.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full border-2 border-blue-400 py-24">
            <Input
              placeholder="Verificaiton code here...."
              type="number"
              onChange={(e) => setVerificationCode(e.target.value)}
              className="py-6"
            />
            <Button>Verify</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export { Verification }
