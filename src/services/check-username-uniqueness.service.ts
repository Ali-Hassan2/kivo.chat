import axios, { AxiosError } from 'axios'
import { API_ENDPOINTS } from '@/actions'
import { ApiResponse } from '@/types'

interface UserNameProps {
  username: string
  signal?: AbortSignal
}

const getUserNameUniqueness = async ({
  username,
  signal,
}: UserNameProps): Promise<ApiResponse> => {
  try {
    const response = await axios.post(
      `${API_ENDPOINTS.getUserRegister}/username?username=${encodeURIComponent(
        username,
      )}`,
      {},
      { signal },
    )
    return response.data
  } catch (err: unknown) {
    const axiosErr = err as AxiosError<ApiResponse>
    if (axiosErr.code === 'ERR_CANCELED') {
      return {
        success: false,
        message: 'Request cancelled.',
      }
    }
    if (axiosErr.response) {
      return axiosErr.response.data
    }
    return {
      success: false,
      message: 'Network Error',
    }
  }
}

export { getUserNameUniqueness }
