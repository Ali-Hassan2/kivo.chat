import React from 'react'
import { resumePluginState } from 'next/dist/build/build-context'
import { useToggle } from 'react-use'
import * as z from 'zod'
import { receiverIdSchema } from '@/guards'
import { getAllMessagesFromConversations } from '@/services'
import { MessagesData } from '@/types'

const useGetAllMessagesFromConversations = () => {
  const [MessagesDataFromConversations, setMessagesDataFromConversations] =
    React.useState<MessagesData[]>([])
  const [
    isGettingMessagesDataFromConversations,
    toggleIsGettingMessagesDataFromConversations,
  ] = useToggle(false)
  const [
    errorMessageForGettingMessagesFromConverastions,
    setErrorMessagesFromConversation,
  ] = React.useState<string | null>('')
  const controllerForGettingMessagesFromConversations =
    React.useRef<AbortController | null>(null)
  const getAllMessagesFromConversationsHook = async (
    data: z.infer<typeof receiverIdSchema>,
  ) => {
    toggleIsGettingMessagesDataFromConversations(true)
    setErrorMessagesFromConversation('')
    if (controllerForGettingMessagesFromConversations.current) {
      controllerForGettingMessagesFromConversations.current.abort()
    }
    const controller = new AbortController()
    controllerForGettingMessagesFromConversations.current = controller
    try {
      const response = await getAllMessagesFromConversations({
        receiverId: data,
        signal: controller.signal,
      })
      if (response.success && response.data) {
        setMessagesDataFromConversations(response.data)
      } else {
        setErrorMessagesFromConversation(false)
      }
    } finally {
        
    }
  }
}
