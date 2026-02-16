import { useRef, useState } from 'react'
import { useToggle } from 'react-use'
import { getAllContactsFromConversations } from '@/services'
import { ContactsFromConversations, ConversationsContacts } from '@/types'

const getAllContactsConversations = () => {
  const [initialConversations, setInitialConversations] = useState<
    ConversationsContacts[]
  >([])
  const [isGettingCoversations, toggleIsGettingConversations] = useToggle(false)
  const [errorMessage, setErrorMessage] = useState<string | null>('')
  const controllerForGettingConversations = useRef<AbortController | null>(null)

  const getAllConversations = async () => {
    toggleIsGettingConversations(true)
    if (controllerForGettingConversations.current) {
      controllerForGettingConversations.current.abort()
    }
    const controller = new AbortController()
    controllerForGettingConversations.current = controller
    try {
      const response = await getAllContactsFromConversations({
        signal: controller.signal,
      })
      if (response.success && response.data) {
        setInitialConversations(response.data)
      } else {
        setErrorMessage(response.message)
      }
    } finally {
      toggleIsGettingConversations(false)
    }
  }

  return {
    initialConversations,
    isGettingCoversations,
    errorMessage,
    getAllConversations,
  }
}

export { getAllContactsConversations }
