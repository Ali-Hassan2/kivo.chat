'use client'

import React, { useEffect } from 'react'
import { Box, Text } from '@radix-ui/themes'
import * as z from 'zod'
import { AllFriends, BlockIcon, ChatIcon, DocumentIcon } from '@/components'
import { receiverIdSchema } from '@/guards'
import { MessagesData } from '@/types'
import { QueryParams } from '@/utils'
import { cn } from '@/utils/cn'

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

  const homeBoxes = [
    {
      label: 'Send Document',
      icon: <DocumentIcon />,
      backgroundColor: 'bg-blue-100',
    },
    {
      label: 'Contacts',
      icon: <AllFriends />,
      backgroundColor: 'bg-green-100',
    },
    {
      label: 'Blocked',
      icon: <BlockIcon />,
      backgroundColor: 'bg-purple-100',
    },
  ]
  return (
    <div className="flex flex-col">
      <Box className="flex h-[90vh] w-full flex-col items-center justify-center">
        <Box className="flex h-100 w-100 items-center justify-center rounded-full bg-orange-200">
          <ChatIcon />
        </Box>
        <Box className={cn('flex gap-4 pt-8')}>
          {homeBoxes.map((box, index) => {
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

      {MessagesDataFromConversations.map((message, index) => {
        return <Box key={index}>{message.content}</Box>
      })}
    </div>
  )
}

export { ConversationBoard }
