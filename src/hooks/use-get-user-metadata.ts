import React from 'react'
import { useToggle } from 'react-use'
import * as z from 'zod'
import { getUserSchema } from '@/guards'
import { getUserWithUsernameReceiverId } from '@/services'
import { UserDataFriendsCount } from '@/types'

const useGetUserMetadata = () => {
  const [userDataFromOverallNetwork, setUserDatFromOverallNetwork] =
    React.useState<UserDataFriendsCount | null>(null)

  const [isGettingUserMetaData, toggleGettingUserMetadata] = useToggle(false)
  const controllerForGettingUserMetaData = React.useRef<AbortController | null>(
    null,
  )

  const getUserMetaDataHook = async (data: z.infer<typeof getUserSchema>) => {
    toggleGettingUserMetadata(true)
    if (controllerForGettingUserMetaData.current) {
      controllerForGettingUserMetaData.current.abort()
    }
    const controller = new AbortController()
    controllerForGettingUserMetaData.current = controller
    await new Promise((resolve) => setTimeout(resolve, 4000))
    try {
      const response = await getUserWithUsernameReceiverId({
        receiverId: data.receiverId,
        username: data.username,
        signal: controller.signal,
      })
      if (response.success && response.data?.user?.length) {
        setUserDatFromOverallNetwork(response.data?.user[0])
      }
    } finally {
      toggleGettingUserMetadata(false)
    }
  }

  return {
    userDataFromOverallNetwork,
    isGettingUserMetaData,
    getUserMetaDataHook,
  }
}

export { useGetUserMetadata }
