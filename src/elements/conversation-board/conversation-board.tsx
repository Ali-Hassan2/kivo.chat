'use client'

import React, { useEffect } from 'react'
import { Box, Text } from '@radix-ui/themes'
import * as z from 'zod'
import { AllFriends, ChatIcon, DocumentIcon } from '@/components'
import { receiverIdSchema } from '@/guards'
import { MessagesData } from '@/types'
import { QueryParams } from '@/utils'

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
    },
    {
      label: 'Contacts',
      icon: <AllFriends />,
    },
  ]
  return (
    <div className="flex flex-col">
      <Box className="flex h-[90vh] w-full items-center justify-center border-4 border-blue-500">
        <Box className="flex h-100 w-100 items-center justify-center rounded-full bg-orange-200">
          <ChatIcon />
        </Box>
        {homeBoxes.map((box, index) => {
          return (
            <Box key={index} className="flex flex-col bg-blue-100 px-6 py-8">
              <Box>{box.icon}</Box>
              <Text>{box.label}</Text>
            </Box>
          )
        })}
      </Box>

      {MessagesDataFromConversations.map((message, index) => {
        return <Box key={index}>{message.content}</Box>
      })}
    </div>
  )
}

export { ConversationBoard }
