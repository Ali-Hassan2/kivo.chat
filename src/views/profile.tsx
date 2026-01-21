'use client'

import React, { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import ProfileBoard from '@/elements/user-profile/profile'
import { accmSchema, flagSchema } from '@/guards'
import {
  useAcceptingMessagesMode,
  useGetCurrentIsAcceptingMessagesStatus,
  useIdentityStatus,
  useIsShowingIdentity,
} from '@/hooks'

const ProfileView = () => {
  const {
    isAcceptingMessagesResponseOverallNetwork,
    isTogglingIsAcceptingMessages,
    changeModeToAcceptingMessages,
  } = useAcceptingMessagesMode()

  const {
    isShowingIdentityResponse,
    isChangingModeForIdentity,
    changeModeForNewIdentity,
  } = useIsShowingIdentity()

  const {
    modeForGettingCurrentIdentityStatus,
    isLoadingForGettingCurrentIdentityStatus,
    getCurrnetIdentityStatus,
  } = useIdentityStatus()

  const {
    CurrentStatusForIsAcceptingMessages,
    isLoadingGettingStatusCurrentForIsAcceptingMessages,
    getCurrentStatus,
  } = useGetCurrentIsAcceptingMessagesStatus()

  const form = useForm<z.infer<typeof accmSchema>>({
    resolver: zodResolver(accmSchema),
    defaultValues: {
      accm: false,
    },
  })

  const formForIsShowingIdentity = useForm<z.infer<typeof flagSchema>>({
    resolver: zodResolver(flagSchema),
    defaultValues: {
      flag: false,
    },
  })

  useEffect(() => {
    getCurrnetIdentityStatus()
    getCurrentStatus()
  }, [])

  return (
    <Box className="borde-red-500 h-full w-[83vw] border bg-sky-100 p-2">
      <ProfileBoard
        form={form}
        isAcceptingMessagesResponseOverallNetwork={
          isAcceptingMessagesResponseOverallNetwork
        }
        isTogglingIsAcceptingMessages={isTogglingIsAcceptingMessages}
        onSubmit={changeModeToAcceptingMessages}
        formForIsShowingIdentity={formForIsShowingIdentity}
        isShowingIdentityResponse={isShowingIdentityResponse}
        isChangingModeForIdentity={isChangingModeForIdentity}
        changeModeForNewIdentity={changeModeForNewIdentity}
        modeForGettingCurrentIdentityStatus={
          modeForGettingCurrentIdentityStatus
        }
        isLoadingForGettingCurrentIdentityStatus={
          isLoadingForGettingCurrentIdentityStatus
        }
        CurrentStatusForIsAcceptingMessages={
          CurrentStatusForIsAcceptingMessages
        }
        isLoadingGettingStatusCurrentForIsAcceptingMessages={
          isLoadingGettingStatusCurrentForIsAcceptingMessages
        }
      />
    </Box>
  )
}

export { ProfileView }
