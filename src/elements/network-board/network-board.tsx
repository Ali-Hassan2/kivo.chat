'use client'

import React from 'react'
import { Label } from '@radix-ui/react-label'
import { Box, Flex, Grid } from '@radix-ui/themes'
import { INetworkUsers } from '@/hooks/types'

interface NetworkBoardProps {
  getAllNetworkBuildingUsers: INetworkUsers[]
  gettingAllUsersForNetworkConnections
  gettingNetworkUsersResponseStatus
  usersRecordForBuildingNetwork
}

const NetworkBoard = () => {
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
          <Grid></Grid>
        </Box>
      </Flex>
    </Box>
  )
}

export { NetworkBoard }
