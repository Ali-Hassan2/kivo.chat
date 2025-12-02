import React, { useRef, useState } from 'react'
import { useToggle } from 'react-use'
import { verifyUser } from '@/services'

const useVerification = () => {
  const [
    verificationCodeForVerificationProcess,
    setVerificationCodeForVerificationProcess,
  ] = useState<string>('')
  const [verificationProcessMessage, setverificationProcessMessage] =
    useState<string>('')
  const [isVerifyingCode, setisVerifyingCode] = useToggle(false)
  const [verificationProcessErrorMessage, setVerificationErrorMessage] =
    useState<string>('')
  const verificationControllerForCurrentApiRequest =
    useRef<AbortController | null>(null)

  const verifyUserCode = async () => {
    setverificationProcessMessage('')
    setisVerifyingCode(false)
    setVerificationErrorMessage('')
    if (verificationControllerForCurrentApiRequest.current) {
      verificationControllerForCurrentApiRequest.current.abort()
    }
    const controller = new AbortController()
    verificationControllerForCurrentApiRequest.current = controller
    const result = await verifyUser({
      verificationCode: verificationCodeForVerificationProcess,
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
