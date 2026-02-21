import axios, { AxiosError } from 'axios'
import { API_ENDPOINTS } from '@/actions'
import { ApiResponse } from '@/types'

interface CancelRequestProps {
  signal: AbortSignal
  requestId: string
}

const CancelRequestForPendingRequest = async ({
  signal,
  requestId,
}: CancelRequestProps): Promise<ApiResponse> => {
  try {
    const response = await axios.post(
      `${API_ENDPOINTS.cancelRequestWhichIsInPendingState}?requestId=${encodeURIComponent(requestId)}`,
      {
        signal,
      },
    )
    console.log('the response idis:', requestId)
    return response.data
  } catch (error: unknown) {
    const axiosError = error as AxiosError<ApiResponse>
    if (axiosError.code === 'ERR_CANCELLED') {
      return {
        success: false,
        message: 'Request cancelled.',
      }
    }
    if (axiosError.response) {
      return axiosError.response.data
    }

    return {
      success: false,
      message: 'Network Error.',
    }
  }
}

export { CancelRequestForPendingRequest }
