import axios, { AxiosError } from 'axios'
import { API_ENDPOINTS } from '@/actions'
import { GetBlockedUsers } from '@/types'

interface GetBlockedUsersProps {
  signal: AbortSignal
}

const getAllBlocks = async ({
  signal,
}: GetBlockedUsersProps): Promise<GetBlockedUsers> => {
  try {
    const response = await axios.get(API_ENDPOINTS.getAllBlocks, { signal })
    return response.data
  } catch (error: unknown) {
    const axiosError = error as AxiosError<GetBlockedUsers>
    if (axiosError.code === 'ERR_CANCELLED') {
      return {
        success: false,
        message: 'Requests cancelled',
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

export { getAllBlocks }
