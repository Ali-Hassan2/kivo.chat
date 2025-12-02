import { useRef, useState } from 'react'
import { useToggle } from 'react-use'
import * as z from 'zod'
import { signUpGuard } from '@/guards'
import { createNewUser, getUserNameUniqueness } from '@/services'

const useRegistration = () => {
  const [
    userFullNameForRegistrationPurpose,
    setUserFullNameForRegistrationPurpose,
  ] = useState<string>('')
  const [
    userChosenUsernameForRegistrationPurpose,
    setUserChosenUsernameForRegistrationPurpose,
  ] = useState<string>('')
  const [
    userEmailAddressForRegistrationPurpose,
    setUserEmailAddressForRegistrationPurpose,
  ] = useState<string>('')
  const [
    userPasswordForRegistrationPurpose,
    setUserPasswordForRegistrationPurpose,
  ] = useState<string>('')
  const [
    registrationErrorMessageForUserInterface,
    setRegistrationErrorMessageForUserInterface,
  ] = useState<string>('')
  const [
    usernameAvailabilityMessageForRegistrationProcess,
    setUsernameAvailabilityMessageForRegistrationProcess,
  ] = useState<string>('')
  const [
    RegistrationFormSubmissionResponse,
    setRegistrationFormSubmissionResponse,
  ] = useState<string>('')
  const [
    isFormLoadingDuringRegistrationProcess,
    toggleFormLoadingDuringRegistrationProcess,
  ] = useToggle(false)
  const [
    isUsernameBeingCheckedForAvailabilityDuringRegistrationProcess,
    toggleUsernameBeingCheckedForAvailabilityDuringRegistrationProcess,
  ] = useToggle(false)
  const [
    isFormSubmissionInProgressDuringRegistrationProcess,
    toggleFormSubmissionInProgressDuringRegistrationProcess,
  ] = useToggle(false)
  const registrationAbortControllerReferenceForCurrentApiRequest =
    useRef<AbortController | null>(null)

  const checkIfUserChosenUsernameIsUniqueForRegistration = async () => {
    if (registrationAbortControllerReferenceForCurrentApiRequest.current) {
      registrationAbortControllerReferenceForCurrentApiRequest.current.abort()
    }
    const controller = new AbortController()
    registrationAbortControllerReferenceForCurrentApiRequest.current =
      controller
    setRegistrationErrorMessageForUserInterface('')
    toggleUsernameBeingCheckedForAvailabilityDuringRegistrationProcess(true)
    setUsernameAvailabilityMessageForRegistrationProcess('')

    const result = await getUserNameUniqueness({
      username: userChosenUsernameForRegistrationPurpose,
    })
    toggleUsernameBeingCheckedForAvailabilityDuringRegistrationProcess(false)
    if (!result.success) {
      setUsernameAvailabilityMessageForRegistrationProcess(
        result.message || result.error || 'Unknown Error',
      )
    } else {
      setUsernameAvailabilityMessageForRegistrationProcess(result.message)
    }
  }

  const submitUserRegistrationFormWithFullData = async (
    data: z.infer<typeof signUpGuard>,
  ) => {
    if (registrationAbortControllerReferenceForCurrentApiRequest.current) {
      registrationAbortControllerReferenceForCurrentApiRequest.current.abort()
    }
    const controller = new AbortController()
    registrationAbortControllerReferenceForCurrentApiRequest.current =
      controller
    setRegistrationErrorMessageForUserInterface('')
    setRegistrationFormSubmissionResponse('')
    toggleFormSubmissionInProgressDuringRegistrationProcess(true)
    const result = await createNewUser({
      username: data.username,
      email: data.email,
      password: data.password,
      fullName: data.fullName,
      signal: controller.signal,
    })
    toggleFormSubmissionInProgressDuringRegistrationProcess(false)
    if (!result.success) {
      setRegistrationErrorMessageForUserInterface(
        result.message || result.error || 'Unknown Error',
      )
    } else {
      setRegistrationFormSubmissionResponse(result.message)
    }
    return result
  }

  return {
    userFullNameForRegistrationPurpose,
    setUserFullNameForRegistrationPurpose,
    userChosenUsernameForRegistrationPurpose,
    setUserChosenUsernameForRegistrationPurpose,
    userEmailAddressForRegistrationPurpose,
    setUserEmailAddressForRegistrationPurpose,
    RegistrationFormSubmissionResponse,
    userPasswordForRegistrationPurpose,
    setUserPasswordForRegistrationPurpose,
    registrationErrorMessageForUserInterface,
    usernameAvailabilityMessageForRegistrationProcess,
    isFormLoadingDuringRegistrationProcess,
    isUsernameBeingCheckedForAvailabilityDuringRegistrationProcess,
    setRegistrationErrorMessageForUserInterface,
    isFormSubmissionInProgressDuringRegistrationProcess,
    checkIfUserChosenUsernameIsUniqueForRegistration,
    submitUserRegistrationFormWithFullData,
  }
}

export { useRegistration }

// --foreground: oklch(0.141 0.005 285.823);
