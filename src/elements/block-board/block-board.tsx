'use client'

import React, { useEffect, useState } from 'react'
import { Avatar, Box, Flex } from '@radix-ui/themes'
import * as z from 'zod'
import { BoardUpperHeader, FriendsIcon, NoData } from '@/components'
import { NetworkIcon } from '@/components/icons/network'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { ALL_BLOCKED_FRIENDS_OVERALLNETWORK_BOARD } from '@/constants/objects-to-iterate'
import { blockingUser, unfriendSchema } from '@/guards'
import { AuthStatus, IBlocks } from '@/types'
import { showToast } from '@/utils'
import ListForBlockedUsersSkeleton from './skeleton'

interface BlockBoardProps {
  getBlocksUsersOverallNetwork: IBlocks[]
  errorMessageForGettingBlockedUsers: string | null
  isGettingBlockedUsers: boolean
  isUnblockingSomeOneOverallNetwork: boolean
  unblockingSomeoneResponse: AuthStatus
  unblockSomeOneOverallNetwork: (
    data: z.infer<typeof unfriendSchema>,
  ) => Promise<any> | void
}

const BlockBoard = ({
  getBlocksUsersOverallNetwork,
  errorMessageForGettingBlockedUsers,
  isGettingBlockedUsers,
  isUnblockingSomeOneOverallNetwork,
  unblockingSomeoneResponse,
  unblockSomeOneOverallNetwork,
}: BlockBoardProps) => {
  useEffect(() => {
    if (errorMessageForGettingBlockedUsers) {
      showToast(errorMessageForGettingBlockedUsers, 'error')
    }
  }, [errorMessageForGettingBlockedUsers])

  useEffect(() => {
    if (unblockingSomeoneResponse.success) {
      const successMessage = unblockingSomeoneResponse.success
      showToast(successMessage, 'success')
    }
    if (unblockingSomeoneResponse.error) {
      const errorMessage = unblockingSomeoneResponse.error
      showToast(errorMessage, 'error')
    }
  }, [unblockingSomeoneResponse])

  const [unblockUser, setUnblockUser] = useState<string | null>('')

  const handleUnblockUser = async (userId: string) => {
    setUnblockUser(userId)
    await unblockSomeOneOverallNetwork(userId)
    setUnblockUser(null)
  }
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
          <Box className="w-full p-3">
            {getBlocksUsersOverallNetwork.map((blkUser) => {
              return (
                <Box className="flex w-full justify-between rounded-md bg-gray-100">
                  <Box className="flex flex-1 items-center p-3">
                    <Avatar
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-200 text-blue-600"
                      fallback={blkUser.username?.[0].toUpperCase() ?? '??'}
                    />
                    <Box className="mt-2 ml-2 flex flex-col gap-2">
                      <Label>{blkUser.fullName}</Label>
                      <Label className="font-normal text-gray-700">
                        {blkUser.bio}
                      </Label>
                    </Box>
                  </Box>
                  <Box className="buttons mr-3 flex flex-1 items-center justify-end">
                    <Button
                      className="cursor-pointer"
                      disabled={unblockUser === blkUser.username}
                      onClick={() => handleUnblockUser(blkUser.username)}
                    >
                      unblock
                    </Button>
                  </Box>
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
