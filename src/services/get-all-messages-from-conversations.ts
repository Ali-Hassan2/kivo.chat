import axios, { AxiosError } from 'axios'
import { API_ENDPOINTS } from '@/actions'
import { ApiResponse, MessagesFromConversations } from '@/types'

interface AllMessagesFromConversationsProps {
  signal: AbortSignal
  receiverId: string
}

const getAllMessagesFromConversations = async ({
  signal,
  receiverId,
}: AllMessagesFromConversationsProps): Promise<MessagesFromConversations> => {
  try {
    const response = await axios.get(
      `${API_ENDPOINTS.getAllMessagesFromConversations}?receiverId=${receiverId}`,
      {
        signal,
      },
    )
    return response.data
  } catch (error: unknown) {
    const axiosError = error as AxiosError<ApiResponse>
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

export { getAllMessagesFromConversations }
