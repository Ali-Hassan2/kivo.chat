'use client'

import React from 'react'
import { NetworkBoard, ProfileNetwork } from '@/elements'
import { cn } from '@/utils/cn'
import { useNetworkUsers } from '@/hooks'

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

  return (
    <div className={cn(height, 'flex')}>
      <ProfileNetwork />
      <NetworkBoard />
    </div>
  )
}

export { Network }
