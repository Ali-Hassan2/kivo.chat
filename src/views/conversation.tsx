import React from 'react'
import { ConversationBoard } from '@/elements'
import { useGetAllMessagesFromConversations, useGetUserMetadata } from '@/hooks'

const Conversation = () => {
  const {
    MessagesDataFromConversations,
    isGettingMessagesDataFromConversations,
    errorMessageForGettingMessagesFromConverastions,
    getAllMessagesFromConversationsHook,
  } = useGetAllMessagesFromConversations()

  const {
    userDataFromOverallNetwork,
    isGettingUserMetaData,
    getUserMetaDataHook,
  } = useGetUserMetadata()
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
      userDataFromOverallNetwork={userDataFromOverallNetwork}
      isGettingUserMetaData={isGettingUserMetaData}
      getUserMetaDataHook={getUserMetaDataHook}
    />
  )
}

export { Conversation }
