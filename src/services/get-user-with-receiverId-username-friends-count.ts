import axios, { AxiosError } from 'axios'
import { API_ENDPOINTS } from '@/actions'
import { ApiResponse, UserWithFriendsCount } from '@/types'

interface GETUSERWITHUSERNAMERECEIVERIDPROPS {
  receiverId: string
  username: string
  signal: AbortSignal
}

const getUserWithUsernameReceiverId = async ({
  receiverId,
  username,
  signal,
}: GETUSERWITHUSERNAMERECEIVERIDPROPS): Promise<UserWithFriendsCount> => {
  try {
    const response = await axios.get(
      `${API_ENDPOINTS.getUserByUsernameAndReceiverIdFriendsCount}?receiverId=${receiverId}&username=${username}`,
      { signal },
    )
    console.log('The username is:', username)
    console.log('the receiverId', receiverId)
    return response.data
  } catch (error: unknown) {
    const axiosError = error as AxiosError<UserWithFriendsCount>
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

export { getUserWithUsernameReceiverId }
