'use client'

import React from 'react'
import { Label } from '@radix-ui/react-label'
import { Avatar, Box, Flex, Grid } from '@radix-ui/themes'
import { AuthStatus, INetworkUsers } from '@/types'

interface NetworkBoardProps {
  getAllNetworkBuildingUsers: () => void
  gettingAllUsersForNetworkConnections: boolean
  gettingNetworkUsersResponseStatus: AuthStatus
  usersRecordForBuildingNetwork: INetworkUsers[]
}

const NetworkBoard = ({
  getAllNetworkBuildingUsers,
  gettingAllUsersForNetworkConnections,
  gettingNetworkUsersResponseStatus,
  usersRecordForBuildingNetwork,
}: NetworkBoardProps) => {
  console.log('The usersRecord', usersRecordForBuildingNetwork)
  return (
    <Box className="w-full">
      <Flex direction="column">
        <Box className="flex h-40 items-center pl-4">
          <Box className="flex flex-col gap-2">
            <Label className="text-4xl font-semibold">Network.</Label>
            <div className="h-[1px] w-40 bg-gray-200" />
          </Box>
        </Box>
        <Box className="border-4">
          <div className="grid grid-cols-4 gap-5 p-4">
            {usersRecordForBuildingNetwork.map((record) => (
              <div
                key={record.username}
                className="flex w-60 flex-col items-center rounded-md border border-blue-700 p-3"
              >
                <Avatar
                  fallback={record.username?.[0].toUpperCase() ?? '?'}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-200 text-blue-700"
                />
                <Label>{record.fullName ?? 'Naveed'}</Label>
              </div>
            ))}
          </div>
        </Box>
      </Flex>
    </Box>
  )
}

export { NetworkBoard }
