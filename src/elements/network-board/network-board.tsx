'use client'

import React, { useEffect, useMemo } from 'react'
import { Label } from '@radix-ui/react-label'
import { Avatar, Box, Flex, Text } from '@radix-ui/themes'
import { Loader2 } from 'lucide-react'
import { useToggle } from 'react-use'
import * as z from 'zod'
import { BoardUpperHeader, PendingIcon } from '@/components'
import { Button } from '@/components/ui/button'
import { FRIENDS_NETWORK_BOARD, REQUEST_STATUS } from '@/constants'
import { NETWORK_BOARD_HEADER } from '@/constants/objects-to-iterate'
import { cancelRequestSchema, makeRequestGuard } from '@/guards'
import { useRequestsToMe } from '@/hooks'
import { getAllRequestToMe } from '@/services'
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
  cancelRequestForPendingRequestOnNetwork: AuthStatus
  isCancellingRequestInPendingRequestOnNetwork: boolean
  cancelRequestOnNetwork: (
    data: z.infer<typeof cancelRequestSchema>,
  ) => Promise<any> | void
  getStatusesForRequests: () => void
  RequestMapForCancelingRequests: Record<string, string>
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
  cancelRequestForPendingRequestOnNetwork,
  isCancellingRequestInPendingRequestOnNetwork,
  getStatusesForRequests,
  cancelRequestOnNetwork,
  RequestMapForCancelingRequests,
}: NetworkBoardProps) => {
  const [cancelingUser, setCancelingUser] = React.useState<string | null>(null)
  const { totalNumberOfRequestsInPendingQueue, GetAllRequestsToMe } =
    useRequestsToMe()

  useEffect(() => {
    GetAllRequestsToMe()
  }, [])
  useEffect(() => {
    if (newRequestCreationResponseStatus.success) {
      showToast(newRequestCreationResponseStatus.success, 'success')
      getStatusesForRequests()
    }
    if (newRequestCreationResponseStatus.error) {
      showToast(newRequestCreationResponseStatus.error, 'error')
    }
  }, [
    newRequestCreationResponseStatus.success,
    newRequestCreationResponseStatus.error,
  ])

  useEffect(() => {
    if (cancelRequestForPendingRequestOnNetwork.success) {
      showToast(cancelRequestForPendingRequestOnNetwork.success, 'success')
      setCancelingUser(null)
      getStatusesForRequests()
    }
    if (cancelRequestForPendingRequestOnNetwork.error) {
      showToast(cancelRequestForPendingRequestOnNetwork.error, 'error')
    }
  }, [
    cancelRequestForPendingRequestOnNetwork.success,
    cancelRequestForPendingRequestOnNetwork.error,
  ])

  return (
    <Box className="w-full">
      <Flex direction="column">
        <BoardUpperHeader
          NextHead={NETWORK_BOARD_HEADER.NextHead}
          ButtonOne={{
            ...NETWORK_BOARD_HEADER.ButtonOne,
            Icon: <PendingIcon />,
          }}
          ButtonTwo={NETWORK_BOARD_HEADER.ButtonTwo}
          lineWidth={NETWORK_BOARD_HEADER.lineWidth}
          totalPendingRequests={totalNumberOfRequestsInPendingQueue}
        />
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
                const userKey = record._id
                const requestId = RequestMapForCancelingRequests[userKey]
                const status = statusForRequests[userKey]
                return (
                  <div
                    key={record._id}
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
                        status
                          ? 'border border-blue-500 bg-transparent text-black hover:bg-transparent'
                          : 'bg-blue-700 text-white',
                      )}
                      onClick={() => {
                        sendingNewRequest({ username: record.username ?? '' })
                        getStatusesForRequests()
                      }}
                      disabled={status === REQUEST_STATUS.PENDING}
                    >
                      {(() => {
                        if (
                          isSendingNewRequestOnNetwork &&
                          requestingRequestUserOnNetwork === record.username
                        ) {
                          return <Loader2 className="animate-spin" />
                        }
                        if (status) {
                          return <Label>{status}</Label>
                        }
                        return <Label>Connect</Label>
                      })()}
                    </Button>
                    {status === REQUEST_STATUS.PENDING &&
                    RequestMapForCancelingRequests[userKey] ? (
                      <Button
                        type="button"
                        className="hover:border-black-800 duration:300 mt-2 w-full cursor-pointer rounded-full transition-all hover:border-2 hover:bg-black/80 hover:text-white"
                        onClick={() =>
                          cancelRequestOnNetwork({
                            requestId: RequestMapForCancelingRequests[userKey],
                          })
                        }
                      >
                        {isCancellingRequestInPendingRequestOnNetwork &&
                        cancelingUser === userKey ? (
                          <Loader2 className="animate-spin" />
                        ) : (
                          <Label>Cancel Request</Label>
                        )}
                      </Button>
                    ) : null}
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
