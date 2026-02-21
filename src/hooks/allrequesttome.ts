import React, { useRef } from 'react'
import { useToggle } from 'react-use'
import { getAllRequestToMe } from '@/services'
import { GetAllRequest, requestToMe } from '@/types'

const useRequestsToMe = () => {
  const [
    isGettingRequestToMeFromOverallNetwork,
    setIsGettingRequestToMeFromOverallNetwork,
  ] = useToggle(false)

  const [
    RecordRequestsForMeFromOverallNetwork,
    setRecordRequestsForMeFromOverallNetwork,
  ] = React.useState<requestToMe[]>([])

  const [
    totalNumberOfRequestsInPendingQueue,
    setTotalNumberOfRequestsInPendingQueue,
  ] = React.useState<number>(0)

  const [
    hasFetchedListDataForPendingReuqests,
    setHasFetchedListDataForPendingReuqests,
  ] = useToggle(false)

  const controllerForGettingMyRequestsInPendingQueue =
    useRef<AbortController | null>(null)
  const GetAllRequestsToMe = async () => {
    setHasFetchedListDataForPendingReuqests(false)
    setIsGettingRequestToMeFromOverallNetwork(true)
    if (controllerForGettingMyRequestsInPendingQueue.current) {
      controllerForGettingMyRequestsInPendingQueue.current.abort()
    }
    const controller = new AbortController()
    controllerForGettingMyRequestsInPendingQueue.current = controller
    await new Promise((resolve) => setTimeout(resolve, 2000))
    const response = await getAllRequestToMe({ signal: controller.signal })
    if (response.success) {
      setRecordRequestsForMeFromOverallNetwork(response.requestToMe ?? [])
      setTotalNumberOfRequestsInPendingQueue(response.count ?? 0)
    }
    setIsGettingRequestToMeFromOverallNetwork(false)
    setHasFetchedListDataForPendingReuqests(true)
  }

  return {
    isGettingRequestToMeFromOverallNetwork,
    RecordRequestsForMeFromOverallNetwork,
    totalNumberOfRequestsInPendingQueue,
    hasFetchedListDataForPendingReuqests,
    GetAllRequestsToMe,
  }
}

export { useRequestsToMe }
