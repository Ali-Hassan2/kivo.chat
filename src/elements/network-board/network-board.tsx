'use client'

import React from 'react'
import { Label } from '@radix-ui/react-label'
import { Avatar, Box, Flex, Grid, Text } from '@radix-ui/themes'
import { SkeletonWrapper } from '@/components'
import { Button } from '@/components/ui/button'
import { AuthStatus, INetworkUsers } from '@/types'
import { GridSkeleton } from './skeleton'

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
        <Box className="">
          {gettingAllUsersForNetworkConnections ? (
            <GridSkeleton gettingAllUsersForNetworkConnections={true} />
          ) : (
            <div className="grid grid-cols-4 gap-5 p-4">
              {usersRecordForBuildingNetwork.map((record) => (
                <div
                  key={record.username}
                  className="flex flex-col items-center rounded-md border border-blue-700 p-3"
                >
                  <Avatar
                    fallback={record.username?.[0].toUpperCase() ?? '?'}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-200 text-blue-700"
                  />
                  <Label className="mt-2 font-semibold">
                    {record.fullName ?? 'Naveed'}
                  </Label>
                  <Text className="mt-2 text-center text-sm text-gray-700">
                    {record.bio ?? 'Naveed have no bio'}
                  </Text>
                  <Button className="mt-4 w-full cursor-pointer rounded-full bg-blue-700 py-4">
                    Connect
                  </Button>
                </div>
              ))}
            </div>
          )}
        </Box>
      </Flex>
    </Box>
  )
}

export { NetworkBoard }
