import { useRef, useState } from 'react'
import { useStateWithHistory, useToggle } from 'react-use'
import { getAllBlocks } from '@/services'
import { IBlocks } from '@/types'

const useGetAllBlocks = () => {
  const [getBlocksUsersOverallNetwork, setGetBlocksUsersOverallNetwork] =
    useState<IBlocks[]>([])
  const [
    errorMessageForGettingBlockedUsers,
    setErrorMessageForGettingBlockedUsers,
  ] = useState<string | null>(null)
  const [isGettingBlockedUsers, setIsGettingBlockedUsers] = useToggle(false)

  const controllerForGettingBlockedUsersOverallNetwork =
    useRef<AbortController | null>(null)

  const gettingAllBlockedUsers = async () => {
    setErrorMessageForGettingBlockedUsers('')
    setIsGettingBlockedUsers(true)
    if (controllerForGettingBlockedUsersOverallNetwork.current) {
      controllerForGettingBlockedUsersOverallNetwork.current.abort()
    }
    const controller = new AbortController()
    controllerForGettingBlockedUsersOverallNetwork.current = controller

    try {
      const response = await getAllBlocks({
        signal: controller.signal,
      })
      if (response.success) {
        setGetBlocksUsersOverallNetwork(response.data ?? [])
      } else {
        setErrorMessageForGettingBlockedUsers(response.message)
      }
    } finally {
      setIsGettingBlockedUsers(false)
    }
  }

  return {
    getBlocksUsersOverallNetwork,
    errorMessageForGettingBlockedUsers,
    isGettingBlockedUsers,
    gettingAllBlockedUsers,
  }
}

export { useGetAllBlocks }
