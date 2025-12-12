'use client'

import React from 'react'
import { Avatar, Box, Flex } from '@radix-ui/themes'
import { Loader2, NetworkIcon } from 'lucide-react'
import * as z from 'zod'
import { BoardUpperHeader, NoData } from '@/components'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { NETWORK } from '@/constants'
import { acceptingMessageGuard, requestIdSchema } from '@/guards'
import { AuthStatus, GetAllRequest, requestToMe } from '@/types'
import { cn } from '@/utils/cn'
import ListSkeleton from './skeleton'

interface FriendsBoardProps {
  isGettingRequestToMeFromOverallNetwork: boolean
  RecordRequestsForMeFromOverallNetwork: requestToMe[]
  totalNumberOfRequestsInPendingQueue: number
  hasFetchedListDataForPendingReuqests: boolean
  AcceptinMessageFromOverallNetworkResponse: AuthStatus
  isAcceptingMessageFromOverallNetwork: boolean
  acceptPendingRequestFromOverallNetwork: (
    data: z.infer<typeof requestIdSchema>,
  ) => Promise<void>
}

const FriendBoard = ({
  isGettingRequestToMeFromOverallNetwork,
  RecordRequestsForMeFromOverallNetwork,
  totalNumberOfRequestsInPendingQueue,
  hasFetchedListDataForPendingReuqests,
  AcceptinMessageFromOverallNetworkResponse,
  isAcceptingMessageFromOverallNetwork,
  acceptPendingRequestFromOverallNetwork,
}: FriendsBoardProps): React.JSX.Element => {
  return (
    <Box className="w-full">
      <BoardUpperHeader
        NextHead="/Pending Requests"
        ButtonOne={{ label: 'Network', href: NETWORK, Icon: <NetworkIcon /> }}
        ButtonTwo={{ label: 'All Friends', href: '#' }}
        lineWidth="w-110"
      />
      <Box
        className={cn(
          RecordRequestsForMeFromOverallNetwork.length === 0 ? 'pt-20' : '',
        )}
      >
        {isGettingRequestToMeFromOverallNetwork ? (
          <ListSkeleton loading={true} />
        ) : RecordRequestsForMeFromOverallNetwork.length > 0 ? (
          <Box className="flex flex-col items-center justify-center border">
            <Box className="flex w-full items-center justify-between rounded-b-lg border p-3 pr-8">
              <Label>Total Pending Requests:</Label>
              <Label>{totalNumberOfRequestsInPendingQueue}</Label>
            </Box>
            <Box className="lists w-full px-2 py-4">
              {RecordRequestsForMeFromOverallNetwork.map((record, index) => (
                <Box
                  className="mt-2 flex justify-between rounded-md border p-3"
                  key={record.from.username}
                >
                  <Box className="flex gap-2">
                    <Label>{index + 1}</Label>
                    <Avatar
                      fallback={record.from.username?.[0].toUpperCase() ?? '?'}
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-200 text-blue-700"
                    />
                    <Label className="text-lg">{record.from.username}</Label>
                  </Box>
                  <Box className="flex items-center gap-3">
                    <Button
                      className="cursor-pointer bg-blue-700 hover:bg-blue-600"
                      onClick={() =>
                        acceptPendingRequestFromOverallNetwork(record._id)
                      }
                    >
                      {isAcceptingMessageFromOverallNetwork ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        <Label className="cursor-pointer">Accept</Label>
                      )}
                    </Button>
                    <Button variant="outline" className="cursor-pointer">
                      Reject Request
                    </Button>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        ) : (
          hasFetchedListDataForPendingReuqests && <NoData />
        )}
      </Box>
    </Box>
  )
}

export { FriendBoard }
