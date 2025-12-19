'use client'

import React, { useEffect } from 'react'
import { Avatar, Box, Flex } from '@radix-ui/themes'
import * as z from 'zod'
import { BlockIcon, BoardUpperHeader, PendingIcon } from '@/components'
import { NetworkIcon } from '@/components/icons/network'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { ALL_FRIENDS_NETWORK_BOARD } from '@/constants/objects-to-iterate'
import { requestIdSchema } from '@/guards'
import { AuthStatus, IGetFriends } from '@/types'

interface AllFriendProps {
  isGettingAllFriendsForOverallNetwork: boolean
  AllFriendsListForOverallNetwork: IGetFriends[] | undefined
  errorForGettingAllFriendsOverallNetwork: string | null
  getAllFriendsForNetwork: () => void
  isUnfriendingRequest: boolean
  UnfriendSomeoneOverallNetworkResponse: AuthStatus
  unfriendSomeoneOnOverallNetwork: (
    data: z.infer<typeof requestIdSchema>,
  ) => Promise<any> | void
}
const AllFriends = ({
  isGettingAllFriendsForOverallNetwork,
  AllFriendsListForOverallNetwork,
  errorForGettingAllFriendsOverallNetwork,
  getAllFriendsForNetwork,
  isUnfriendingRequest,
  UnfriendSomeoneOverallNetworkResponse,
  unfriendSomeoneOnOverallNetwork,
}: AllFriendProps) => {
  useEffect(() => {
    getAllFriendsForNetwork()
  }, [])
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
        <Box className="p-4">
          <Box className="flex items-center justify-end">
            <Button className="cursor-pointer bg-blue-700">
              <BlockIcon />
              View All Block Contacts
            </Button>
          </Box>
          {AllFriendsListForOverallNetwork?.map((friendList) => {
            return (
              <Box className="mt-2 flex w-full items-center rounded-md border p-2">
                <Box className="flex flex-1">
                  <Avatar
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-300 text-white"
                    fallback={friendList.username?.[0].toUpperCase() ?? 'F'}
                  />
                  <Box className="mt-1 ml-2">
                    <Label className="text-md mb-1">
                      {friendList.fullName}
                    </Label>
                    <Label className="text-sm text-black/70">
                      {friendList.bio}
                    </Label>
                  </Box>
                </Box>
                <Box className="flex flex-1 items-center justify-end pr-4">
                  <Button className="cursor-pointer bg-blue-700">
                    {isUnfriendingRequest ? (
                      <Loader2
                    ):()}
                  </Button>
                </Box>
              </Box>
            )
          })}
        </Box>
      </Flex>
    </Box>
  )
}

export { AllFriends }
