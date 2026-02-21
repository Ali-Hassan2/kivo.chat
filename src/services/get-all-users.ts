import axios, { AxiosError } from 'axios'
import { API_ENDPOINTS } from '@/actions'
import { ApiResponse } from '@/types'

interface getAllNetworkUsersProps {
  signal?: AbortSignal
}

const getAllUsersForNetworkConnections = async ({
  signal,
}: getAllNetworkUsersProps): Promise<ApiResponse> => {
  try {
    const response = await axios.get(`${API_ENDPOINTS.networkUsers}`, {
      signal,
    })
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

export { getAllUsersForNetworkConnections }
