import axios, { AxiosError } from 'axios'
import { API_ENDPOINTS } from '@/actions'
import { ApiResponse } from '@/types'

interface SignUpProps {
  username: string
  email: string
  password: string
  fullName?: string
  signal?: AbortSignal
}

const createNewUser = async ({
  username,
  email,
  password,
  fullName,
  signal,
}: SignUpProps): Promise<ApiResponse> => {
  try {
    const response = await axios.post(
      `${API_ENDPOINTS.getUserRegister}`,
      {
        body: {
          username,
          email,
          password,
          fullName,
        },
      },
      {
        signal,
      },
    )
    return response.data
  } catch (error: unknown) {
    const axiosError = error as AxiosError<ApiResponse>
    if (axiosError.code === 'ERR_CANCELLED') {
      return {
        success: false,
        message: 'request cancelled',
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

export { createNewUser }
