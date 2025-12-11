'use client'

import React from 'react'
import { Avatar, Box, Flex } from '@radix-ui/themes'
import { BoardUpperHeader, NoData } from '@/components'
import { Label } from '@/components/ui/label'
import { NETWORK } from '@/constants'
import { GetAllRequest, requestToMe } from '@/types'
import { cn } from '@/utils/cn'

interface FriendsBoardProps {
  isGettingRequestToMeFromOverallNetwork: boolean
  RecordRequestsForMeFromOverallNetwork: requestToMe[]
  totalNumberOfRequestsInPendingQueue: number
}

const FriendBoard = ({
  isGettingRequestToMeFromOverallNetwork,
  RecordRequestsForMeFromOverallNetwork,
  totalNumberOfRequestsInPendingQueue,
}: FriendsBoardProps) => {
  console.log(
    'The requests are from api are:',
    RecordRequestsForMeFromOverallNetwork,
  )
  return (
    <Box className="w-full">
      <Flex className="" direction="column"></Flex>
      <BoardUpperHeader
        NextHead="/Pending Requests"
        ButtonOne={{ label: 'Network', href: NETWORK }}
        ButtonTwo={{
          label: 'All Friends',
          href: '#',
        }}
        lineWidth="w-110"
      />
      <Box
        className={cn(
          RecordRequestsForMeFromOverallNetwork.length === 0 ? 'pt-20' : '',
        )}
      >
        {RecordRequestsForMeFromOverallNetwork.length === 0 ? (
          <NoData />
        ) : (
          <Box className="flex flex-col items-center justify-center border-4">
            <Box className="flex w-full items-center justify-between">
              <Label>Totl Pending Requests:</Label>
              <Label>{totalNumberOfRequestsInPendingQueue}</Label>
            </Box>
            <Box className="lists">
              {RecordRequestsForMeFromOverallNetwork.map((record) => {
                return (
                  <div
                    className="flex justify-between"
                    key={record.from.username}
                  >
                    <Box className="flex gap-2 border-4">
                      <Avatar
                        fallback={
                          record.from.username?.[0].toUpperCase() ?? '?'
                        }
                        className="flex h-8 w-8 items-center justify-center bg-blue-200 text-blue-700"
                      />
                      <Label>{record.from.username}</Label>
                    </Box>
                    <Box className="flex items-center gap-3"></Box>
                  </div>
                )
              })}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export { FriendBoard }
