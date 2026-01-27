import axios, { AxiosError } from 'axios'
import { API_ENDPOINTS } from '@/actions'
import { ProfileCountResposne } from '@/types'

interface ProfileCountProps {
  signal: AbortSignal
}

const getProfileCount = async ({
  signal,
}: ProfileCountProps): Promise<ProfileCountResposne> => {
  try {
    const response = await axios.get<ProfileCountResposne>(
      API_ENDPOINTS.getProfileCount,
      {
        signal,
      },
    )
    return response.data
  } catch (error: unknown) {
    const axiosError = error as AxiosError<ProfileCountResposne>
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
      message: 'Network error',
    }
  }
}

export { getProfileCount }
