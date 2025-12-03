import React, { Suspense } from 'react'
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
import { QUERY_PARAMS } from '@/constants'
import { Verification } from '@/elements'
import { verifyCodeSchema } from '@/guards'
import { useVerification } from '@/hooks/verification.hook'
import { QueryParams } from '@/utils'

const page = () => {
  const username = QueryParams({
    key: QUERY_PARAMS.USERNAME,
    defaultValue: QUERY_PARAMS.DEFAULT,
  })
  const form = useForm<z.infer<typeof verifyCodeSchema>>({
    resolver: zodResolver(verifyCodeSchema),
    defaultValues: {
      verficationCode: '',
    },
  })

  const {
    isVerifyingCode,
    verificationProcessErrorMessage,
    verificationProcessMessage,
    verifyUserCode,
  } = useVerification()

  return (
    <Suspense fallback={null}>
      <div className="flex h-[100vh] w-[100vw] items-center justify-center bg-white">
        <div className="shadow-kivo rounded-kivo">
          <Card className="w-100">
            <CardHeader>
              <CardTitle className="mx-auto text-2xl">
                Kivo Verification
              </CardTitle>
              <div className="mx-auto w-4/5 border-1"></div>
              <CardDescription className="mt-2">
                Please check your provided mail to get the code. Enter the valid
                code to proceed.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Verification
                form={form}
                onSubmit={(data) =>
                  verifyUserCode({
                    verficationCode: data.verficationCode,
                    username: username,
                  })
                }
                verifyingProcessMessage={verificationProcessMessage}
                verifyProcessError={verificationProcessErrorMessage}
                isVerifyingCode={isVerifyingCode}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </Suspense>
  )
}

export default page

// export const dynamic = 'force-dynamic'
