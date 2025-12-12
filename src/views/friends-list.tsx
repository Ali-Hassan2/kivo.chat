'use client'

import React, { useEffect } from 'react'
import { FriendBoard, ProfileNetwork } from '@/elements'
import { useAcceptingRequest, useNetworkCount, useRequestsToMe } from '@/hooks'
import { cn } from '@/lib/utils'

interface FriendsListProps {
  height: string
}
const FriendsList = ({ height }: FriendsListProps) => {
  const {
    isGettingRequestToMeFromOverallNetwork,
    RecordRequestsForMeFromOverallNetwork,
    totalNumberOfRequestsInPendingQueue,
    hasFetchedListDataForPendingReuqests,
    GetAllRequestsToMe,
  } = useRequestsToMe()

  const {
    userCountObtainedFromNetwork,
    isGettingUserNetworkCount,
    userCountResponseStatusForNetwork,
    gettingUserNetworkCount,
  } = useNetworkCount()

  const {
    AcceptinMessageFromOverallNetworkResponse,
    isAcceptingMessageFromOverallNetwork,
    acceptPendingRequestFromOverallNetwok,
  } = useAcceptingRequest()

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
        hasFetchedListDataForPendingReuqests={
          hasFetchedListDataForPendingReuqests
        }
        AcceptinMessageFromOverallNetworkResponse={
          AcceptinMessageFromOverallNetworkResponse
        }
        isAcceptingMessageFromOverallNetwork={
          isAcceptingMessageFromOverallNetwork
        }
        acceptPendingRequestFromOverallNetwork={
          acceptPendingRequestFromOverallNetwok
        }
      />
    </div>
  )
}

export { FriendsList }
