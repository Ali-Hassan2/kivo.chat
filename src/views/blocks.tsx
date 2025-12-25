'use client'

import React, { useEffect } from 'react'
import { Box } from '@radix-ui/themes'
import { BlockBoard, ProfileNetwork } from '@/elements'
import { useGetAllBlocks, useNetworkCount, useUnBlockSomeone } from '@/hooks'
import { useAuthRedirection } from '@/utils'

const BlocksView = () => {
  const {
    userCountObtainedFromNetwork,
    isGettingUserNetworkCount,
    userCountResponseStatusForNetwork,
    gettingUserNetworkCount,
  } = useNetworkCount()

  const user = useAuthRedirection()

  const {
    getBlocksUsersOverallNetwork,
    errorMessageForGettingBlockedUsers,
    isGettingBlockedUsers,
    gettingAllBlockedUsers,
  } = useGetAllBlocks()

  const {
    isUnblockingSomeOneOverallNetwork,
    unblockingSomeoneResponse,
    unblockSomeOneOverallNetwork,
  } = useUnBlockSomeone()

  useEffect(() => {
    if (user) {
      gettingUserNetworkCount()
      gettingAllBlockedUsers()
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
      <BlockBoard
        getBlocksUsersOverallNetwork={getBlocksUsersOverallNetwork}
        errorMessageForGettingBlockedUsers={errorMessageForGettingBlockedUsers}
        isGettingBlockedUsers={isGettingBlockedUsers}
        isUnblockingSomeOneOverallNetwork={isUnblockingSomeOneOverallNetwork}
        unblockingSomeoneResponse={unblockingSomeoneResponse}
        unblockSomeOneOverallNetwork={unblockSomeOneOverallNetwork}
      />
    </Box>
  )
}

export { BlocksView }
