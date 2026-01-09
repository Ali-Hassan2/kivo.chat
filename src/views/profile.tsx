'use client'

import React from 'react'
import { Box } from '@radix-ui/themes'
import ProfileBoard from '@/elements/user-profile/profile'
import { useAcceptingMessagesMode } from '@/hooks'

const ProfileView = () => {
  const {
    isAcceptingMessagesResponseOverallNetwork,
    isTogglingIsAcceptingMessages,
    changeModeToAcceptingMessages,
  } = useAcceptingMessagesMode()

  return (
    <Box className="borde-red-500 h-full w-[83vw] border p-2">
      <ProfileBoard />
    </Box>
  )
}

export { ProfileView }
