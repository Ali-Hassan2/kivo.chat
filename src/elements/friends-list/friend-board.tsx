'use client'

import React from 'react'
import { Box, Flex } from '@radix-ui/themes'
import { BoardUpperHeader, NoData } from '@/components'
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
          <p>yes there is something here new.</p>
        )}
      </Box>
    </Box>
  )
}

export { FriendBoard }
