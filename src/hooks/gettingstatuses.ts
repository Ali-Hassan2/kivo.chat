import { useRef, useState } from 'react'
import { useToggle } from 'react-use'
import { GettingAllRequestStatuses } from '@/services'

const useGetStatuses = () => {
  const [isGettingStatusesForRequests, setIsGettingStatusesForRequests] =
    useToggle(false)
  const [StatusesForRequests, setStatusesForRequests] = useState<
    Record<string, string>
  >({})
  const controllerForGettingRequestsStatusesOnNetwork =
    useRef<AbortController | null>(null)

  const getStatusesForRequests = async () => {
    setIsGettingStatusesForRequests(true)
    if (controllerForGettingRequestsStatusesOnNetwork.current) {
      controllerForGettingRequestsStatusesOnNetwork.current.abort()
    }
    const controller = new AbortController()
    controllerForGettingRequestsStatusesOnNetwork.current = controller
    const response = await GettingAllRequestStatuses({
      signal: controller.signal,
    })
    if (response.success && response.statuses) {
      setStatusesForRequests(response.statuses)
    }
    setIsGettingStatusesForRequests(false)
  }

  return {
    isGettingStatusesForRequests,
    StatusesForRequests,
    getStatusesForRequests,
  }
}

export { useGetStatuses }
