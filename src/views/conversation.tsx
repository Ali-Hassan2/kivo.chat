import React from 'react'
import { ConversationBoard } from '@/elements'
import { useGetAllMessagesFromConversations } from '@/hooks'

const Conversation = () => {
  const {
    MessagesDataFromConversations,
    isGettingMessagesDataFromConversations,
    errorMessageForGettingMessagesFromConverastions,
    getAllMessagesFromConversationsHook,
  } = useGetAllMessagesFromConversations()
  return (
    <ConversationBoard
      MessagesDataFromConversations={MessagesDataFromConversations}
      isGettingMessagesDataFromConversations={
        isGettingMessagesDataFromConversations
      }
      errorMessageForGettingMessagesFromConverastions={
        errorMessageForGettingMessagesFromConverastions
      }
      getAllMessagesFromConversationsHook={getAllMessagesFromConversationsHook}
    />
  )
}

export { Conversation }
