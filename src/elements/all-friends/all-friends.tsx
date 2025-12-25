'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import { Avatar, Box, Flex } from '@radix-ui/themes'
import { Loader2 } from 'lucide-react'
import * as z from 'zod'
import { BlockIcon, BoardUpperHeader, NoData, PendingIcon } from '@/components'
import { NetworkIcon } from '@/components/icons/network'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { BLOCK_FRIENDS } from '@/constants'
import { ALL_FRIENDS_NETWORK_BOARD } from '@/constants/objects-to-iterate'
import { requestIdSchema, unfriendSchema } from '@/guards'
import { AuthStatus, IGetFriends } from '@/types'
import { showToast } from '@/utils'
import ListSkeleton from './skeleton'

interface AllFriendProps {
  isGettingAllFriendsForOverallNetwork: boolean
  AllFriendsListForOverallNetwork: IGetFriends[]
  errorForGettingAllFriendsOverallNetwork: string | null
  getAllFriendsForNetwork: () => void
  isUnfriendingRequest: boolean
  UnfriendSomeoneOverallNetworkResponse: AuthStatus
  unfriendSomeoneOnOverallNetwork: (
    data: z.infer<typeof unfriendSchema>,
  ) => Promise<any> | void
  isBlockingSomeone: boolean
  BlockSomeoneResponse: AuthStatus | null
  doBlockSomeone: (data: z.infer<typeof unfriendSchema>) => Promise<any> | void
}
const AllFriends = ({
  isGettingAllFriendsForOverallNetwork,
  AllFriendsListForOverallNetwork,
  errorForGettingAllFriendsOverallNetwork,
  getAllFriendsForNetwork,
  isUnfriendingRequest,
  UnfriendSomeoneOverallNetworkResponse,
  unfriendSomeoneOnOverallNetwork,
  isBlockingSomeone,
  BlockSomeoneResponse,
  doBlockSomeone,
}: AllFriendProps) => {
  useEffect(() => {
    getAllFriendsForNetwork()
  }, [])

  useEffect(() => {
    if (UnfriendSomeoneOverallNetworkResponse.success) {
      const successMessage = UnfriendSomeoneOverallNetworkResponse.success
      showToast(successMessage, 'success')
    }
    if (UnfriendSomeoneOverallNetworkResponse.error) {
      const errorMessage = UnfriendSomeoneOverallNetworkResponse.error
      showToast(errorMessage, 'error')
    }
    if (errorForGettingAllFriendsOverallNetwork) {
      showToast(errorForGettingAllFriendsOverallNetwork, 'error')
    }
  }, [UnfriendSomeoneOverallNetworkResponse])

  useEffect(() => {
    if (BlockSomeoneResponse?.success) {
      const successMessage = BlockSomeoneResponse?.success
      showToast(successMessage, 'success')
    }
    if (BlockSomeoneResponse?.error) {
      const errorMessage = BlockSomeoneResponse?.error
      showToast(errorMessage, 'error')
    }
  }, [BlockSomeoneResponse])

  const [unfriendUser, setUnfriendUser] = React.useState<string | null>(null)
  const [blockingUser, setBlockingUser] = React.useState<string | null>(null)

  const handleUnfriend = async (userId: string) => {
    setUnfriendUser(userId)
    await unfriendSomeoneOnOverallNetwork(userId)
    setUnfriendUser(null)
  }
  const handleBlockedUser = async (username: string) => {
    setBlockingUser(username)
    await doBlockSomeone(username)
    setBlockingUser(null)
  }
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
              <Link href={BLOCK_FRIENDS} className="flex items-center gap-2">
                <BlockIcon />
                View All Block Contacts
              </Link>
            </Button>
          </Box>
          {isGettingAllFriendsForOverallNetwork ? (
            <ListSkeleton loading={isGettingAllFriendsForOverallNetwork} />
          ) : AllFriendsListForOverallNetwork?.length > 0 ? (
            AllFriendsListForOverallNetwork?.map((friendList) => {
              return (
                <Box
                  className="mt-2 flex w-full items-center rounded-md border p-2"
                  key={friendList._id}
                >
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
                    <Button
                      className="cursor-pointer bg-blue-700"
                      onClick={() => handleUnfriend(friendList._id)}
                      disabled={unfriendUser === friendList._id}
                    >
                      {unfriendUser === friendList._id ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        <Label className="cursor-pointer">Unfriend</Label>
                      )}
                    </Button>
                    <Button
                      className="ml-2 cursor-pointer"
                      onClick={() => handleBlockedUser(friendList.username)}
                      disabled={blockingUser === friendList._id}
                    >
                      {blockingUser === friendList._id ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        <Label className="cursor-pointer">Block</Label>
                      )}
                    </Button>
                  </Box>
                </Box>
                // TODO: I have to add pagination from next.js
              )
            })
          ) : (
            <NoData />
          )}
        </Box>
      </Flex>
    </Box>
  )
}

export { AllFriends }
