'use client'

import React, { useEffect } from 'react'
import { FriendBoard, ProfileNetwork } from '@/elements'
import { useNetworkCount, useRequestsToMe } from '@/hooks'
import { cn } from '@/lib/utils'

interface FriendsListProps {
  height: string
}
const FriendsList = ({ height }: FriendsListProps) => {
  const {
    isGettingRequestToMeFromOverallNetwork,
    RecordRequestsForMeFromOverallNetwork,
    totalNumberOfRequestsInPendingQueue,
    GetAllRequestsToMe,
  } = useRequestsToMe()

  const {
    userCountObtainedFromNetwork,
    isGettingUserNetworkCount,
    userCountResponseStatusForNetwork,
    gettingUserNetworkCount,
  } = useNetworkCount()

  useEffect(() => {
    gettingUserNetworkCount()
    GetAllRequestsToMe()
  }, [])
  return (
    <div className={cn(height, 'flex')}>
      <ProfileNetwork
        userCountObtainedFromNetwork={userCountObtainedFromNetwork ?? 0}
        isGettingUserNetworkCount={isGettingUserNetworkCount}
        userCountResponseStatusForNetwork={userCountResponseStatusForNetwork}
      />
      <FriendBoard
        isGettingRequestToMeFromOverallNetwork={
          isGettingRequestToMeFromOverallNetwork
        }
        RecordRequestsForMeFromOverallNetwork={
          RecordRequestsForMeFromOverallNetwork
        }
        totalNumberOfRequestsInPendingQueue={
          totalNumberOfRequestsInPendingQueue
        }
      />
    </div>
  )
}

export { FriendsList }
