import axios, { AxiosError } from 'axios'
import { API_ENDPOINTS } from '@/actions'
import { ProfileGettingResponse } from '@/types'

interface getAllProfilesForOverallNetworkProps {
  signal: AbortSignal
}

const getAllProfilesForOverallNetwork = async ({
  signal,
}: getAllProfilesForOverallNetworkProps): Promise<ProfileGettingResponse> => {
  try {
    const response = await axios.get(
      API_ENDPOINTS.getAllAnonProfilesForOverallNetwork,
      {
        signal,
      },
    )
    return response.data
  } catch (error: unknown) {
    const axiosError = error as AxiosError<ProfileGettingResponse>
    if (axiosError.code === 'ERR_CANCELED') {
      return {
        success: false,
        message: 'Request cancelled',
        data: {
          profiles: [],
        },
      }
    }
    if (axiosError.response) {
      return axiosError.response.data
    }
    return {
      success: false,
      message: 'Network Error',
      data: {
        profiles: [],
      },
    }
  }
}

export { getAllProfilesForOverallNetwork }
