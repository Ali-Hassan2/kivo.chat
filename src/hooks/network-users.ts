import { useRef, useState } from 'react'
import { useToggle } from 'react-use'
import { getAllUsersForNetworkConnections } from '@/services'
import { INetworkUsers } from '@/types'

interface AuthStatus {
  success: string
  error: string
}

const useNetworkUsers = () => {
  const [
    gettingAllUsersForNetworkConnections,
    setGettingAllUsersForNetworkConnection,
  ] = useToggle(false)

  const [usersRecordForBuildingNetwork, setUsersRecordForBuildingNetwork] =
    useState<INetworkUsers[]>([])

  const [
    gettingNetworkUsersResponseStatus,
    setGettingNetworkUsersResponseStatus,
  ] = useState<AuthStatus>({
    success: '',
    error: '',
  })

  const gettingNetworkUsersLiveTrackControllerrRef =
    useRef<AbortController | null>(null)

  const setError = (message: string) => {
    setGettingNetworkUsersResponseStatus((prev) => ({
      ...prev,
      success: '',
      error: message,
    }))
  }

  const setSuccess = (message: string) => {
    setGettingNetworkUsersResponseStatus((prev) => ({
      ...prev,
      success: message,
      error: '',
    }))
  }

  const getAllNetworkBuildingUsers = async () => {
    if (gettingNetworkUsersLiveTrackControllerrRef.current) {
      gettingNetworkUsersLiveTrackControllerrRef.current.abort()
    }

    const controller = new AbortController()
    gettingNetworkUsersLiveTrackControllerrRef.current = controller

    setError('')
    setSuccess('')
    setGettingAllUsersForNetworkConnection(true)

    const response = await getAllUsersForNetworkConnections({
      signal: controller.signal,
    })

    if (!response.success) {
      setError(response.message || 'Getting users error')
    } else {
      setSuccess(response.message || 'Fetched Successfully.')
      setUsersRecordForBuildingNetwork(response.data ?? [])
    }

    setGettingAllUsersForNetworkConnection(false)
  }
  return {
    getAllNetworkBuildingUsers,
    gettingAllUsersForNetworkConnections,
    gettingNetworkUsersResponseStatus,
    usersRecordForBuildingNetwork,
  }
}

export { useNetworkUsers }
