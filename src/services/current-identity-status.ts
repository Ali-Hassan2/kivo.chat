import axios, { AxiosError } from 'axios'
import { API_ENDPOINTS } from '@/actions'
import { ApiResponse, ModeResponsForOverallNetwork } from '@/types'

interface ModeProps {
  signal: AbortSignal
}
const getCurrentStatusForShowingIdentity = async ({
  signal,
}: ModeProps): Promise<ModeResponsForOverallNetwork> => {
  try {
    const response = await axios.get(
      API_ENDPOINTS.getCurrentStatuForShowingIdentity,
      {
        signal,
      },
    )
    return response.data
  } catch (error: unknown) {
    const axiosError = error as AxiosError<ModeResponsForOverallNetwork>
    if (axiosError.code === 'ERR_CANCELLED') {
      return {
        success: false,
        message: 'Request Failed',
        mode: false,
      }
    }
    if (axiosError.response) {
      return axiosError.response.data
    }

    return {
      success: false,
      message: 'Network Error',
      mode: false,
    }
  }
}

export { getCurrentStatusForShowingIdentity }
