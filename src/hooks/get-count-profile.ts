import { useRef, useState } from 'react'
import { useToggle } from 'react-use'
import { getProfileCount } from '@/services'
import { CountData } from '@/types'

const useGetProfileCountForNewOne = () => {
  const [countData, setCountData] = useState<CountData | null>(null)
  const [isGettingCountData, setIsGettingCountData] = useToggle(false)

  const controllerForGettingProfileCount = useRef<AbortController | null>(null)

  const getCountProfileAction = async () => {
    setIsGettingCountData(true)
    await new Promise((resolve) => setTimeout(resolve, 3000))
    if (controllerForGettingProfileCount.current) {
      controllerForGettingProfileCount.current.abort()
    }
    const controller = new AbortController()
    controllerForGettingProfileCount.current = controller
    try {
      const response = await getProfileCount({
        signal: controller.signal,
      })
      if (response.success && response.data) {
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
