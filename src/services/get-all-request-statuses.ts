import axios, { AxiosError } from 'axios'
import { API_ENDPOINTS } from '@/actions'
import { GettingStatuses } from '@/types'

interface GettingAllRequestStatusesProps {
  signal?: AbortSignal
}

const GettingAllRequestStatuses = async ({
  signal,
}: GettingAllRequestStatusesProps): Promise<GettingStatuses> => {
  try {
    const response = await axios.get(API_ENDPOINTS.getAllRequestStatuses, {
      signal,
    })
    return response.data
  } catch (error: unknown) {
    const axiosError = error as AxiosError<GettingStatuses>
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

export { GettingAllRequestStatuses }
