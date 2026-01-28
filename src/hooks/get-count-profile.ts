import { useRef, useState } from 'react'
import { useToggle } from 'react-use'
import { CountData } from '@/types'
import { getProfileCount } from '@/services'

const useGetProfileCountForNewOne = () => {
  const [countData, setCountData] = useState<CountData | null>()
  const [isGettingCountData, setIsGettingCountData] = useToggle(false)

  const controllerForGettingProfileCount = useRef<AbortController>(null)

  const getCountProfileAction = async () => {
    setIsGettingCountData(true)
    if (controllerForGettingProfileCount.current) {
      controllerForGettingProfileCount.current.abort()
    }
    const controller = new AbortController()
    controllerForGettingProfileCount.current = controller
    try {
      const response = await getProfileCount({
        signal: controller.signal,
      })
      if (response.success) {
        setCountData(response.data)
      }
    } finally {
      setIsGettingCountData(false)
    }
  }

  return {
    countData,
    isGettingCountData,
    getCountProfileAction,
  }
}

export { useGetProfileCountForNewOne }
