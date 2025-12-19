import axios, { AxiosError } from 'axios'
import { API_ENDPOINTS } from '@/actions'
import { ApiResponse } from '@/types'

interface UnfriendSomeoneProps {
  signal: AbortSignal
  userId: string
}

const UnfriendSomeone = async ({
  signal,
  userId,
}: UnfriendSomeoneProps): Promise<ApiResponse> => {
  try {
    const response = await axios.post(
      `${API_ENDPOINTS.unfriendSomeoneOverallNetwork}?requesId=${userId}`,
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
        message: 'Request cancnelled',
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

export { UnfriendSomeone }
