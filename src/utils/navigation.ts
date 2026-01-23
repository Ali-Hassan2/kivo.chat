'use client'

import { useRouter } from 'nextjs-toploader/app'

const useNavigation = () => {
  if (typeof window === 'undefined') {
    return { navigateTo: () => {} }
  }

  const router = useRouter()

  const navigateTo = (path: string) => {
    router.replace(path)
  }

  return { navigateTo }
}

export { useNavigation }
