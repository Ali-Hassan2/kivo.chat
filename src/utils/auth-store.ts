import { useSession } from 'next-auth/react'

const getServerUser = () => {
  const { data: session } = useSession()
  return session
}

export { getServerUser }
