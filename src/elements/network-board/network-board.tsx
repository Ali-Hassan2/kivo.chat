'use client'

import React, { useEffect } from 'react'
import { Label } from '@radix-ui/react-label'
import { Avatar, Box, Flex, Grid, Text } from '@radix-ui/themes'
import { Loader2 } from 'lucide-react'
import * as z from 'zod'
import { SkeletonWrapper } from '@/components'
import { Button } from '@/components/ui/button'
import { makeRequestGuard } from '@/guards'
import { AuthStatus, INetworkUsers } from '@/types'
import { showToast } from '@/utils'
import { GridSkeleton } from './skeleton'

interface NetworkBoardProps {
  getAllNetworkBuildingUsers: () => void
  gettingAllUsersForNetworkConnections: boolean
  gettingNetworkUsersResponseStatus: AuthStatus
  usersRecordForBuildingNetwork: INetworkUsers[]
  isSendingNewRequestOnNetwork: boolean
  newRequestCreationResponseStatus: AuthStatus
  sendingNewRequest: (
    data: z.infer<typeof makeRequestGuard>,
  ) => Promise<any> | void
  requestingRequestUserOnNetwork: string
}

const NetworkBoard = ({
  getAllNetworkBuildingUsers,
  gettingAllUsersForNetworkConnections,
  gettingNetworkUsersResponseStatus,
  usersRecordForBuildingNetwork,
  isSendingNewRequestOnNetwork,
  newRequestCreationResponseStatus,
  sendingNewRequest,
  requestingRequestUserOnNetwork,
}: NetworkBoardProps) => {
  useEffect(() => {
    if (newRequestCreationResponseStatus.success) {
      const successMessagge = newRequestCreationResponseStatus.success
      showToast(successMessagge, 'success')
    }
    if (newRequestCreationResponseStatus.error) {
      const errorMessage = newRequestCreationResponseStatus.error
      showToast(errorMessage, 'error')
    }
  }, [newRequestCreationResponseStatus])
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
                  <Button
                    className="mt-4 w-full cursor-pointer rounded-full bg-blue-700 py-4"
                    onClick={() =>
                      sendingNewRequest({
                        username: record.username ?? '',
                      })
                    }
                  >
                    {isSendingNewRequestOnNetwork &&
                    requestingRequestUserOnNetwork === record.username ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <Label>Connect</Label>
                    )}
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
