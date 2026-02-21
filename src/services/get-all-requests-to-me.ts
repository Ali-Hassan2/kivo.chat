import axios, { AxiosError } from 'axios'
import { API_ENDPOINTS } from '@/actions'
import { GetAllRequest } from '@/types'

interface getAllRequestToMeProps {
  signal: AbortSignal
}

const getAllRequestToMe = async ({
  signal,
}: getAllRequestToMeProps): Promise<GetAllRequest> => {
  try {
    const response = await axios.get(API_ENDPOINTS.getAllRequestsToMe, {
      signal,
    })
    return response.data
  } catch (error: unknown) {
    const axiosError = error as AxiosError<GetAllRequest>
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
      message: 'Network Error',
    }
  }
}

export { getAllRequestToMe }
