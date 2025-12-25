'use client'

import React from 'react'
import { Box, Flex } from '@radix-ui/themes'
import { BoardUpperHeader, FriendsIcon, NoData } from '@/components'
import { NetworkIcon } from '@/components/icons/network'
import { ALL_BLOCKED_FRIENDS_OVERALLNETWORK_BOARD } from '@/constants/objects-to-iterate'
import { IBlocks } from '@/types'
import ListForBlockedUsersSkeleton from './skeleton'

interface BlockBoardProps {
  getBlocksUsersOverallNetwork: IBlocks[]
  errorMessageForGettingBlockedUsers: string | null
  isGettingBlockedUsers: boolean
}

const BlockBoard = ({
  getBlocksUsersOverallNetwork,
  errorMessageForGettingBlockedUsers,
  isGettingBlockedUsers,
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
        {isGettingBlockedUsers ? (
          <ListForBlockedUsersSkeleton loading={isGettingBlockedUsers} />
        ) : getBlocksUsersOverallNetwork.length > 0 ? (
          <Box className="w-full border-4 border-red-500">
            {getBlocksUsersOverallNetwork.map((blkUser) => {
              return (
                <Box>
                  {blkUser.username}
                  {blkUser.fullName}
                  {blkUser.bio}
                </Box>
              )
            })}
          </Box>
        ) : (
          <NoData />
        )}
      </Flex>
    </Box>
  )
}

export { BlockBoard }
