'use client'

import { useRouter } from 'nextjs-toploader/app'

const useNavigation = () => {
  const router = useRouter()
  const navigateTo = (path: string) => {
    if (typeof window === 'undefined') {
      return
    }
    router.replace(path)
  }

  return { navigateTo }
}

export { useNavigation }
