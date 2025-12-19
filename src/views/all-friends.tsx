'use client'

import React, { useEffect } from 'react'
import { Box } from '@radix-ui/themes'
import { AllFriends, ProfileNetwork } from '@/elements'
import { useNetworkCount } from '@/hooks'
import { useShowAllFriends } from '@/hooks/get-all-friends'
import { useUnfriendSomeOneOverallNetwork } from '@/hooks/unfriend-someone'

const AllFriendsView = () => {
  const {
    userCountObtainedFromNetwork,
    isGettingUserNetworkCount,
    userCountResponseStatusForNetwork,
    gettingUserNetworkCount,
  } = useNetworkCount()

  const {
    isGettingAllFriendsForOverallNetwork,
    AllFriendsListForOverallNetwork,
    errorForGettingAllFriendsOverallNetwork,
    getAllFriendsForNetwork,
  } = useShowAllFriends()

  const {
    isUnfriendingRequest,
    UnfriendSomeoneOverallNetworkResponse,
    unfriendSomeoneOnOverallNetwork,
  } = useUnfriendSomeOneOverallNetwork()

  useEffect(() => {
    gettingUserNetworkCount()
  }, [])
  return (
    <Box className="flex h-[91vh]">
      <ProfileNetwork
        userCountObtainedFromNetwork={userCountObtainedFromNetwork ?? 0}
        isGettingUserNetworkCount={isGettingUserNetworkCount}
        userCountResponseStatusForNetwork={userCountResponseStatusForNetwork}
      />
      <AllFriends
        isGettingAllFriendsForOverallNetwork={
          isGettingAllFriendsForOverallNetwork
        }
        AllFriendsListForOverallNetwork={AllFriendsListForOverallNetwork}
        errorForGettingAllFriendsOverallNetwork={
          errorForGettingAllFriendsOverallNetwork
        }
        getAllFriendsForNetwork={getAllFriendsForNetwork}
        isUnfriendingRequest={isUnfriendingRequest}
        UnfriendSomeoneOverallNetworkResponse={
          UnfriendSomeoneOverallNetworkResponse
        }
        unfriendSomeoneOnOverallNetwork={unfriendSomeoneOnOverallNetwork}
      />
    </Box>
  )
}

export { AllFriendsView }
