'use client'

import React, { useEffect } from 'react'
import { NetworkBoard, ProfileNetwork } from '@/elements'
import {
  useGetStatuses,
  useNetworkCount,
  useNetworkUsers,
  useNewRequest,
} from '@/hooks'
import { cn } from '@/utils/cn'

interface NetworkProps {
  height: string
}
const Network = ({ height }: NetworkProps) => {
  const {
    getAllNetworkBuildingUsers,
    gettingAllUsersForNetworkConnections,
    gettingNetworkUsersResponseStatus,
    usersRecordForBuildingNetwork,
  } = useNetworkUsers()

  const {
    isSendingNewRequestOnNetwork,
    newRequestCreationResponseStatus,
    sendingNewRequest,
    requestingRequestUserOnNetwork,
  } = useNewRequest()

  const {
    userCountObtainedFromNetwork,
    isGettingUserNetworkCount,
    userCountResponseStatusForNetwork,
    gettingUserNetworkCount,
  } = useNetworkCount()

  const {
    isGettingStatusesForRequests,
    StatusesForRequests,
    getStatusesForRequests,
  } = useGetStatuses()

  useEffect(() => {
    getAllNetworkBuildingUsers()
    gettingUserNetworkCount()
    getStatusesForRequests()
  }, [])

  return (
    <div className={cn(height, 'flex')}>
      <ProfileNetwork
        userCountObtainedFromNetwork={userCountObtainedFromNetwork ?? 0}
        isGettingUserNetworkCount={isGettingUserNetworkCount}
        userCountResponseStatusForNetwork={userCountResponseStatusForNetwork}
      />
      <NetworkBoard
        getAllNetworkBuildingUsers={getAllNetworkBuildingUsers}
        gettingAllUsersForNetworkConnections={
          gettingAllUsersForNetworkConnections
        }
        gettingNetworkUsersResponseStatus={gettingNetworkUsersResponseStatus}
        usersRecordForBuildingNetwork={usersRecordForBuildingNetwork}
        isSendingNewRequestOnNetwork={isSendingNewRequestOnNetwork}
        newRequestCreationResponseStatus={newRequestCreationResponseStatus}
        sendingNewRequest={sendingNewRequest}
        requestingRequestUserOnNetwork={requestingRequestUserOnNetwork}
        statusForRequests={StatusesForRequests}
        isGettingStatusesForRequests={isGettingStatusesForRequests}
      />
    </div>
  )
}

export { Network }
