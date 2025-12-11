'use client'

import React from 'react'
import { Box, Flex } from '@radix-ui/themes'
import { BoardUpperHeader } from '@/components'
import { NETWORK } from '@/constants'
import { GetAllRequest, requestToMe } from '@/types'

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
      <Box className="w-full border-1 border-t"></Box>
    </Box>
  )
}

export { FriendBoard }
