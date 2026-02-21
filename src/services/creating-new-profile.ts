import axios, { AxiosError } from 'axios'
import { API_ENDPOINTS } from '@/actions'
import { ApiResponse } from '@/types'

interface CreateNewProfileProps {
  signal: AbortSignal
  username: string
  fullName: string
  email: string
  bio: string
}

const createNewProfileFake = async ({
  username,
  email,
  fullName,
  bio,
  signal,
}: CreateNewProfileProps): Promise<ApiResponse> => {
  try {
    const response = await axios.post(
      `${API_ENDPOINTS.createNewProfileFake}`,
      {
        username,
        fullName,
        bio,
        email,
      },
      {
        signal,
      },
    )
    return response.data
  } catch (error: unknown) {
    const axiosError = error as AxiosError<ApiResponse>
    if (axiosError.code === 'ERR_CANCELED') {
      return {
        success: false,
        message: 'Request Cancelled',
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

export { createNewProfileFake }
