import React, { useRef, useState } from 'react'
import { useToggle } from 'react-use'
import { verifyUser } from '@/services'

interface useVerificationProps {
  verficationCode: string
  username?: string
}

const useVerification = () => {
  const [verificationProcessMessage, setverificationProcessMessage] =
    useState<string>('')
  const [isVerifyingCode, setisVerifyingCode] = useToggle(false)
  const [verificationProcessErrorMessage, setVerificationErrorMessage] =
    useState<string>('')
  const verificationControllerForCurrentApiRequest =
    useRef<AbortController | null>(null)

  const verifyUserCode = async ({
    verficationCode,
    username,
  }: useVerificationProps) => {
    setverificationProcessMessage('')
    setisVerifyingCode(false)
    setVerificationErrorMessage('')
    if (verificationControllerForCurrentApiRequest.current) {
      verificationControllerForCurrentApiRequest.current.abort()
    }
    const controller = new AbortController()
    verificationControllerForCurrentApiRequest.current = controller
    const result = await verifyUser({
      verificationCode: verficationCode,
      username: username,
      signal: controller.signal,
    })
    if (!result.success) {
      setVerificationErrorMessage(
        result.message || result.error || 'unkown error message',
      )
    } else {
      setverificationProcessMessage(result.message)
    }
  }

  return {
    verificationProcessMessage,
    verificationProcessErrorMessage,
    isVerifyingCode,
    verifyUserCode,
  }
}

export { useVerification }
