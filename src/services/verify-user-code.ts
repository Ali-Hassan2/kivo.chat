import axios, { AxiosError } from 'axios'
import { API_ENDPOINTS } from '@/actions'
import { ApiResponse } from '@/types'

interface verifyUserProps {
  verificationCode: string
  signal?: AbortSignal
}
const verifyUser = async ({
  verificationCode,
}: verifyUserProps): Promise<ApiResponse> => {
  console.log('The verificationCode is:', verificationCode)
  try {
    const response = await axios.get(
      `${API_ENDPOINTS.verifyUserCode}?verifyCode=${verificationCode}`,
      { signal },
    )
    return response.data
  } catch (error: unknown) {
    const axiosError = error as AxiosError<ApiResponse>
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

export { verifyUser }
