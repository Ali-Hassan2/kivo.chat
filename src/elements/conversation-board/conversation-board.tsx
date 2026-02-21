'use client'

import React, { useEffect } from 'react'
import { Avatar, Box, Text } from '@radix-ui/themes'
import * as z from 'zod'
import { AllFriends, BlockIcon, ChatIcon, DocumentIcon } from '@/components'
import { HomeBoxes } from '@/constants/objects-to-iterate'
import { getUserSchema, receiverIdSchema } from '@/guards'
import { MessagesData, UserDataFriendsCount } from '@/types'
import { QueryParams, useAuthRedirection } from '@/utils'
import { cn } from '@/utils/cn'
import { ConversationSkeletonWrapper } from './skeleton.wrapper'
import { TopBannerSkeleton } from './top-banner'

interface ConversationBoardProps {
  MessagesDataFromConversations: MessagesData[]
  isGettingMessagesDataFromConversations: boolean
  errorMessageForGettingMessagesFromConverastions: string | null
  getAllMessagesFromConversationsHook: (
    data: z.infer<typeof receiverIdSchema>,
  ) => void
  userDataFromOverallNetwork: UserDataFriendsCount | null
  isGettingUserMetaData: boolean
  getUserMetaDataHook: (data: z.infer<typeof getUserSchema>) => void
}

const ConversationBoard = ({
  MessagesDataFromConversations,
  isGettingMessagesDataFromConversations,
  errorMessageForGettingMessagesFromConverastions,
  getAllMessagesFromConversationsHook,
  isGettingUserMetaData,
  userDataFromOverallNetwork,
  getUserMetaDataHook,
}: ConversationBoardProps) => {
  const receiverId = QueryParams('receiverId')
  const username = QueryParams('username')

  useEffect(() => {
    if (receiverId && username) {
      const fetchAll = async () => {
        await Promise.all([
          getAllMessagesFromConversationsHook(receiverId),

          getUserMetaDataHook({
            receiverId: receiverId,
            username: username,
          }),
        ])
      }
      fetchAll()
    } else if (receiverId) {
      getAllMessagesFromConversationsHook(receiverId)
    }
  }, [receiverId, receiverId])
  useEffect(() => {
    if (receiverId && username) {
      getUserMetaDataHook({
        receiverId: receiverId,
        username: username,
      })
    }
  }, [receiverId, username])
  const user = useAuthRedirection()
  const uid = user?._id
  console.log('------------isGettingUserMetaData', isGettingUserMetaData)
  return (
    <Box className="flex h-[90vh] flex-col">
      {MessagesDataFromConversations.length > 0 ? (
        <>
          {isGettingUserMetaData ? (
            <TopBannerSkeleton loading={isGettingUserMetaData} />
          ) : (
            <Box className="flex w-full">
              <Avatar
                className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-200"
                fallback={
                  userDataFromOverallNetwork?.username?.[0].toUpperCase() ?? '?'
                }
              />
              <Text>{userDataFromOverallNetwork?.fullName}</Text>
            </Box>
          )}
          <Box className="flex flex-1 flex-col justify-end overflow-y-auto px-2">
            {isGettingMessagesDataFromConversations ? (
              <ConversationSkeletonWrapper
                loading={isGettingMessagesDataFromConversations}
              />
            ) : (
              MessagesDataFromConversations.map((message, index) => {
                return (
                  <Box
                    key={index}
                    className={cn(
                      'w-full p-2',
                      message.sender === uid
                        ? 'flex items-center justify-end'
                        : 'flex items-center justify-start',
                    )}
                  >
                    <Box
                      className={cn(
                        'max-w-[70%] rounded-lg p-4',
                        message.sender === uid
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100',
                      )}
                    >
                      {message.content}
                    </Box>
                  </Box>
                )
              })
            )}
          </Box>
          {/* TODO: Have to add Input using hookform */}
          <Box className="border-t p-4"></Box>
        </>
      ) : (
        <Box className="flex h-full w-full flex-col items-center justify-center">
          <Box className="flex h-60 w-60 items-center justify-center rounded-full bg-orange-200 p-8">
            <ChatIcon />
          </Box>
          <Box className={cn('flex gap-4 pt-8')}>
            {HomeBoxes.map((box, index) => {
              return (
                <Box
                  key={index}
                  className={cn(
                    'flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg px-6 py-8 shadow-lg',
                    box.backgroundColor,
                  )}
                >
                  <Box>{box.icon}</Box>
                  <Text>{box.label}</Text>
                </Box>
              )
            })}
          </Box>
        </Box>
      )}
    </Box>
  )
}

export { ConversationBoard }
