'use client'

import React, { useEffect } from 'react'
import { Label } from '@radix-ui/react-label'
import { Avatar, Box, Flex, Text } from '@radix-ui/themes'
import { Loader2 } from 'lucide-react'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { REQUEST_STATUS } from '@/constants'
import { makeRequestGuard } from '@/guards'
import { AuthStatus, INetworkUsers } from '@/types'
import { showToast } from '@/utils'
import { cn } from '@/utils/cn'
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
  statusForRequests: Record<string, string>
  isGettingStatusesForRequests: boolean
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
  statusForRequests,
  isGettingStatusesForRequests,
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

  console.log(
    'Is the skeleton is loading',
    gettingAllUsersForNetworkConnections,
  )
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
            <GridSkeleton
              gettingAllUsersForNetworkConnections={
                gettingAllUsersForNetworkConnections
              }
            />
          ) : (
            <div className="grid grid-cols-4 gap-5 p-4">
              {usersRecordForBuildingNetwork.map((record) => {
                const userId = record?._id
                return (
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
                      className={cn(
                        'mt-4 w-full cursor-pointer rounded-full py-4',
                        statusForRequests[userId]
                          ? 'border border-blue-500 bg-transparent text-black hover:bg-transparent'
                          : 'bg-blue-700 text-white',
                      )}
                      onClick={() =>
                        sendingNewRequest({ username: record.username ?? '' })
                      }
                      disabled={
                        statusForRequests[userId] === REQUEST_STATUS.PENDING
                      }
                    >
                      {(() => {
                        if (
                          isSendingNewRequestOnNetwork &&
                          requestingRequestUserOnNetwork === record.username
                        ) {
                          return <Loader2 className="animate-spin" />
                        }
                        if (statusForRequests[userId]) {
                          return <Label>{statusForRequests[userId]}</Label>
                        }
                        return <Label>Connect</Label>
                      })()}
                    </Button>
                  </div>
                )
              })}
            </div>
          )}
        </Box>
      </Flex>
    </Box>
  )
}

export { NetworkBoard }
