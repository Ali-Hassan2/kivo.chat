import axios, { AxiosError } from 'axios'
import { API_ENDPOINTS } from '@/actions'
import { MakeNewNetworkRequest } from '@/types'

interface MakeRequestProps {
  username: string
  signal: AbortSignal
}

const MakeNetworkRequest = async ({
  username,
  signal,
}: MakeRequestProps): Promise<MakeNewNetworkRequest> => {
  try {
    const response = await axios.post(
      `${API_ENDPOINTS.makeANetowrkRequest}?username=${username}`,
      {
        signal,
      },
    )
    return response.data
  } catch (error: unknown) {
    const axiosError = error as AxiosError<MakeNewNetworkRequest>
    if (axiosError.code === 'ERR_CANCEDLLED') {
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

export { MakeNetworkRequest }
