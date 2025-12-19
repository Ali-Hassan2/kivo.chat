import React, { useState } from 'react'
import { useToggle } from 'react-use'
import { getAllMyFriends } from '@/services'
import { IGetFriends } from '@/types'

const useShowAllFriends = () => {
  const [
    isGettingAllFriendsForOverallNetwork,
    setIsGettingAllFriendsForOverallNetwork,
  ] = useToggle(false)
  const [AllFriendsListForOverallNetwork, setAllFriendsListForOverallNetwork] =
    useState<IGetFriends[]>([])

  const [
    errorForGettingAllFriendsOverallNetwork,
    setErrorForGettingAllFriendsOverallNetwork,
  ] = useState<string | null>('')

  const controllerForGetttingNetworkAllFriends =
    React.useRef<AbortController | null>(null)

  const getAllFriendsForNetwork = async () => {
    setErrorForGettingAllFriendsOverallNetwork('')
    setIsGettingAllFriendsForOverallNetwork(true)
    if (controllerForGetttingNetworkAllFriends.current) {
      controllerForGetttingNetworkAllFriends.current.abort()
    }
    const controller = new AbortController()
    controllerForGetttingNetworkAllFriends.current = controller
    try {
      const response = await getAllMyFriends({
        signal: controller.signal,
      })
      if (response.success) {
        setErrorForGettingAllFriendsOverallNetwork('')
        setAllFriendsListForOverallNetwork(response.friends ?? [])
      }
    } finally {
      setIsGettingAllFriendsForOverallNetwork(false)
    }
  }

  return {
    isGettingAllFriendsForOverallNetwork,
    AllFriendsListForOverallNetwork,
    errorForGettingAllFriendsOverallNetwork,
    getAllFriendsForNetwork,
  }
}

export { useShowAllFriends }
