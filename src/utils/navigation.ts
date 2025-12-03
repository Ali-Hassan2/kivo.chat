'use client'

import { useRouter } from 'next/navigation'

const useNavigation = () => {
  const router = useRouter()
  const navigateTo = (path: string) => {
    router.replace(path)
  }
  return { navigateTo }
}

export { useNavigation }
