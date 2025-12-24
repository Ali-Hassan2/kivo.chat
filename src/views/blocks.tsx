'use client'

import React, { useEffect } from 'react'
import { Box } from '@radix-ui/themes'
import { ProfileNetwork } from '@/elements'
import { useNetworkCount } from '@/hooks'
import { useAuthRedirection } from '@/utils'

const BlocksView = () => {
  const {
    userCountObtainedFromNetwork,
    isGettingUserNetworkCount,
    userCountResponseStatusForNetwork,
    gettingUserNetworkCount,
  } = useNetworkCount()

  const user = useAuthRedirection()

  useEffect(() => {
    if (user) {
      gettingUserNetworkCount()
    }
  }, [user])

  if (!user) {
    return <p>Please login first</p>
  }

  return (
    <Box className="flex h-[91vh]">
      <ProfileNetwork
        userCountObtainedFromNetwork={userCountObtainedFromNetwork ?? 0}
        isGettingUserNetworkCount={isGettingUserNetworkCount}
        userCountResponseStatusForNetwork={userCountResponseStatusForNetwork}
      />
    </Box>
  )
}

export { BlocksView }
