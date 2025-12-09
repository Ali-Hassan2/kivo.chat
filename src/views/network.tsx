'use client'

import React, { useEffect } from 'react'
import { NetworkBoard, ProfileNetwork } from '@/elements'
import {
  useCancelRequest,
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

  const {
    cancelRequestForPendingRequestOnNetwork,
    isCancellingRequestInPendingRequestOnNetwork,
    cancelRequestOnNetwork,
  } = useCancelRequest()

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
        cancelRequestForPendingRequestOnNetwork={
          cancelRequestForPendingRequestOnNetwork
        }
        isCancellingRequestInPendingRequestOnNetwork={
          isCancellingRequestInPendingRequestOnNetwork
        }
        cancelRequestOnNetwork={cancelRequestOnNetwork}
      />
    </div>
  )
}

export { Network }
