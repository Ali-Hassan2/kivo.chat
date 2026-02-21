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
      API_ENDPOINTS.getUserRegister,
      {
        username,
        email,
        password,
        fullName,
      },
      { signal },
    )
    return response.data
  } catch (err: unknown) {
    const axiosErr = err as AxiosError<ApiResponse>
    if (axiosErr.code === 'ERR_CANCELED') {
      return {
        success: false,
        message: 'Request cancelled',
      }
    }
    if (axiosErr.response) {
      return axiosErr.response.data
    }
    return {
      success: false,
      message: 'Network Error',
    }
  }
}

export { createNewUser }
