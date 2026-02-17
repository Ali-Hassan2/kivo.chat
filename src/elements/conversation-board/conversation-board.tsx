'use client'

import React, { useEffect } from 'react'
import { Box } from '@radix-ui/themes'
import * as z from 'zod'
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
  }, [receiverId,getAllMessagesFromConversationsHook])
  return (
    <div className="flex flex-col">
      Here we will talk to each {receiverId}
      {MessagesDataFromConversations.map((message,index) => {
        return <Box key={}>{message.content}</Box>
      })}
    </div>
  )
}

export { ConversationBoard }
