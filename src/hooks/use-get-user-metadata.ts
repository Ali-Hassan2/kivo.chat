import React from 'react'
import { useToggle } from 'react-use'
import { UserDataFriendsCount } from '@/types'

const useGetUserMetadata = () => {
  const [userDataFromOverallNetwork, setUserDatFromOverallNetwork] =
    React.useState<UserDataFriendsCount>({})

  const [isGettingUserMetaData, toggleGettingUserMetadata] = useToggle(false)
  const controllerForGettingUserMetaData = React.useRef<AbortController | null>(
    null,
  )

  const getUserMetaData = async (data: z.infer<typeof ) => {
    toggleGettingUserMetadata(true)
    if (controllerForGettingUserMetaData.current) {
      controllerForGettingUserMetaData.current.abort()
    }
    const controller = new AbortController()
    controllerForGettingUserMetaData.current = controller
    await new Promise((resolve) => setTimeout(resolve, 4000))
    try {
        const response = awai 
    } catch (error) {}
  }
}
