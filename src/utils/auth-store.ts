import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { AUTH } from '@/constants'
import { useNavigation } from './navigation'

const useAuthRedirection = () => {
  const { data: session } = useSession()
  const { navigateTo } = useNavigation()

  useEffect(() => {
    if (!session || !session?.user) {
      setTimeout(() => {
        navigateTo(AUTH)
      })
    }
  }, [session, navigateTo])

  return session?.user
}

export { useAuthRedirection }
