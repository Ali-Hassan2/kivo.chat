import axios, { AxiosError } from 'axios'
import { API_ENDPOINTS } from '@/actions'
import { ApiResponse } from '@/types'

interface UserNameProps {
  username: string
}

const getUserNameUniqueness = async ({
  username,
}: UserNameProps): Promise<ApiResponse> => {
  try {
    const response = await axios.get(
      `${API_ENDPOINTS.confirmUniqueUsername}?username=${username}`,
      {},
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
