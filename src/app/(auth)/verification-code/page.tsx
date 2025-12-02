'use client'

import React from 'react'
import * as z from 'zod'
import { Verification } from '@/elements'
import { useForm } from 'react-hook-form'
import { verifyCodeSchema } from '@/guards'
import { zodResolver } from '@hookform/resolvers/zod'
import { useVerification } from '@/hooks/verification.hook'


const page = () => {
  const form = useForm<z.infer <typeof verifyCodeSchema>>({
    resolver: zodResolver(verifyCodeSchema),
    defaultValues:{
      verficationCode:'',
    }
  })

  const {isVerifyingCode,verificationProcessErrorMessage,verificationProcessMessage, verifyUserCode} = useVerification()

  return (

  )
}

export default page
