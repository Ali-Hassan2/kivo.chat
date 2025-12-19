'use client'

import React from 'react'
import { Box, Flex } from '@radix-ui/themes'
import { BoardUpperHeader, PendingIcon } from '@/components'
import { NetworkIcon } from '@/components/icons/network'
import { ALL_FRIENDS_NETWORK_BOARD } from '@/constants/objects-to-iterate'
import { IGetFriends } from '@/types'

interface AllFriendProps {
  isGettingAllFriendsForOverallNetwork: boolean
  AllFriendsListForOverallNetwork: IGetFriends[]
  errorForGettingAllFriendsOverallNetwork: string
  getAllFriendsForNetwork: () => void
}
const AllFriends = () => {
  return (
    <Box className="w-full">
      <Flex direction="column">
        <BoardUpperHeader
          NextHead={ALL_FRIENDS_NETWORK_BOARD.NextHead}
          ButtonOne={{
            ...ALL_FRIENDS_NETWORK_BOARD.ButtonOne,
            Icon: <NetworkIcon />,
          }}
          ButtonTwo={ALL_FRIENDS_NETWORK_BOARD.ButtonTwo}
          lineWidth={ALL_FRIENDS_NETWORK_BOARD.lineWidth}
        />
        <Box className="border-4 border-red-500">
          
        </Box>
      </Flex>
    </Box>
  )
}

export { AllFriends }
