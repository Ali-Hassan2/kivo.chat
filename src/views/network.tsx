'use client'

import React, { useEffect } from 'react'
import { NetworkBoard, ProfileNetwork } from '@/elements'
import { useNetworkCount, useNetworkUsers, useNewRequest } from '@/hooks'
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
    statusForSendingRequest,
  } = useNewRequest()

  const {
    userCountObtainedFromNetwork,
    isGettingUserNetworkCount,
    userCountResponseStatusForNetwork,
    gettingUserNetworkCount,
  } = useNetworkCount()

  useEffect(() => {
    getAllNetworkBuildingUsers()
  }, [])

  return (
    <div className={cn(height, 'flex')}>
      <ProfileNetwork />
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
        statusForSendingRequest={statusForSendingRequest}
        userCountObtainedFromNetwork={userCountObtainedFromNetwork}
        isGettingUserNetworkCount={isGettingUserNetworkCount}
        userCountResponseStatusForNetwork={userCountResponseStatusForNetwork}
        gettingUserNetworkCount={gettingUserNetworkCount}
      />
    </div>
  )
}

export { Network }
