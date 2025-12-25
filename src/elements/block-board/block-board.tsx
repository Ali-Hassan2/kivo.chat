'use client'

import React from 'react'
import { Box, Flex } from '@radix-ui/themes'
import { BoardUpperHeader, FriendsIcon } from '@/components'
import { NetworkIcon } from '@/components/icons/network'
import { ALL_BLOCKED_FRIENDS_OVERALLNETWORK_BOARD } from '@/constants/objects-to-iterate'
import { IBlocks } from '@/types'

interface BlockBoardProps {
  getBlocksUsersOverallNetwork: IBlocks[]
  errorMessageForGettingBlockedUsers: string | null
  isGettingBlockedUsers: boolean
  gettingAllBlockedUsers: () => Promise<any> | void
}

const BlockBoard = ({
  getBlocksUsersOverallNetwork,
  errorMessageForGettingBlockedUsers,
  isGettingBlockedUsers,
  gettingAllBlockedUsers,
}: BlockBoardProps) => {
  return (
    <Box className="w-full">
      <Flex direction="column">
        <BoardUpperHeader
          NextHead={ALL_BLOCKED_FRIENDS_OVERALLNETWORK_BOARD.NextHead}
          ButtonOne={{
            ...ALL_BLOCKED_FRIENDS_OVERALLNETWORK_BOARD.ButtonOne,
            Icon: <FriendsIcon />,
          }}
          ButtonTwo={ALL_BLOCKED_FRIENDS_OVERALLNETWORK_BOARD.ButtonTwo}
          lineWidth={ALL_BLOCKED_FRIENDS_OVERALLNETWORK_BOARD.lineWidth}
        />
        
      </Flex>
    </Box>
  )
}

export { BlockBoard }
