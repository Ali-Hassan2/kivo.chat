import axios, { AxiosError } from 'axios'
import { API_ENDPOINTS } from '@/actions'
import { GetAllFriends } from '@/types'

interface getAllFriendsProps {
  signal: AbortSignal
}

const getAllMyFriends = async ({
  signal,
}: getAllFriendsProps): Promise<GetAllFriends> => {
  try {
    const response = await axios.get(API_ENDPOINTS.getAllFriendsForNetwork, {
      signal,
    })
    return response.data
  } catch (error: unknown) {
    const axiosError = error as AxiosError<GetAllFriends>
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

export { getAllMyFriends }
