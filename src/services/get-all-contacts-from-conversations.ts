import axios, { AxiosError } from 'axios'
import { API_ENDPOINTS } from '@/actions'
import { ContactsFromConversations } from '@/types'

interface GetConversationContactProps {
  signal: AbortSignal
}

const getAllContactsFromConversations = async ({
  signal,
}: GetConversationContactProps): Promise<ContactsFromConversations> => {
  try {
    const response = await axios.get<ContactsFromConversations>(
      API_ENDPOINTS.getAllConversationsAtInitialLoadForContacts,
      {
        signal,
      },
    )
    return response.data
  } catch (error: unknown) {
    const axiosError = error as AxiosError<ContactsFromConversations>
    if (axiosError.code === 'ERR_CANCELLED') {
      return {
        success: false,
        message: 'Request cancelled',
      }
    }
    if (axiosError.response) {
      return axiosError.response.data
    }
    return {
      success: false,
      message: 'Network Error',
    }
  }
}

export { getAllContactsFromConversations }
