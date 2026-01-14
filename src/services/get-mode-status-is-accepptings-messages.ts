import axios, { AxiosError } from 'axios'
import { API_ENDPOINTS } from '@/actions'
import { ApiResponse, isAcceptingMessagesResponse } from '@/types'

interface StatusProps {
  signal: AbortSignal
}

const getStatusForIsAcceptingMessages = async ({
  signal,
}: StatusProps): Promise<isAcceptingMessagesResponse> => {
  try {
    const response = await axios.get(
      API_ENDPOINTS.getCurrentModeForGettingStatusIsAcceptingMessages,
      {
        signal,
      },
    )

    return response.data
  } catch (error: unknown) {
    const axiosError = error as AxiosError<isAcceptingMessagesResponse>
    if (axiosError.code === 'ERR_CANCELLED') {
      return {
        success: false,
        message: 'Request cancelled',
        mode: false,
      }
    }
    if (axiosError.response) {
      return axiosError.response.data
    }
    return {
      success: false,
      message: 'Network eError',
      mode: false,
    }
  }
}

export { getStatusForIsAcceptingMessages }
