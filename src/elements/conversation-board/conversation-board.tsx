'use client'

import React, { useEffect } from 'react'
import { Box, Text } from '@radix-ui/themes'
import * as z from 'zod'
import { AllFriends, BlockIcon, ChatIcon, DocumentIcon } from '@/components'
import { HomeBoxes } from '@/constants/objects-to-iterate'
import { receiverIdSchema } from '@/guards'
import { MessagesData } from '@/types'
import { QueryParams, useAuthRedirection } from '@/utils'
import { cn } from '@/utils/cn'
import { ConversationSkeletonWrapper } from './skeleton.wrapper'

interface ConversationBoardProps {
  MessagesDataFromConversations: MessagesData[]
  isGettingMessagesDataFromConversations: boolean
  errorMessageForGettingMessagesFromConverastions: string | null
  getAllMessagesFromConversationsHook: (
    data: z.infer<typeof receiverIdSchema>,
  ) => void
}

const ConversationBoard = ({
  MessagesDataFromConversations,
  isGettingMessagesDataFromConversations,
  errorMessageForGettingMessagesFromConverastions,
  getAllMessagesFromConversationsHook,
}: ConversationBoardProps) => {
  const receiverId = QueryParams('receiverId')
  useEffect(() => {
    if (receiverId) {
      getAllMessagesFromConversationsHook(receiverId)
    }
  }, [receiverId])

  const user = useAuthRedirection()
  const uid = user?._id
  return (
    <div className="flex flex-col">
      {MessagesDataFromConversations.length > 0 ? (
        isGettingMessagesDataFromConversations ? (
          <ConversationSkeletonWrapper
            loading={isGettingMessagesDataFromConversations}
          />
        ) : (
          MessagesDataFromConversations.map((message, index) => {
            return (
              <Box
                className={cn(
                  'w-full p-2',
                  message.sender === uid
                    ? 'flex items-center justify-end'
                    : 'flex items-center justify-start',
                )}
              >
                <Box
                  className={cn(
                    'rounded-lg p-4',
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
        )
      ) : (
        <Box className="flex h-[90vh] w-full flex-col items-center justify-center">
          <Box className="flex h-100 w-100 items-center justify-center rounded-full bg-orange-200">
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
    </div>
  )
}

export { ConversationBoard }
