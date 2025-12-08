import axios, { Axios, AxiosError } from 'axios'
import { API_ENDPOINTS } from '@/actions'
import { ApiResponse } from '@/types'

interface GetNetworkUserProps {
  signal?: AbortSignal
}

const GetNetworkUser = async ({
  signal,
}: GetNetworkUserProps): Promise<ApiResponse> => {
  try {
    const response = await axios.get(API_ENDPOINTS.getNetworkCount, {
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

export { GetNetworkUser }
