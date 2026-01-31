import { CountData } from '@/types'

interface ProfileUserProps {
  fullName: string
  username: string
  email: string
  bio: string
  countData: CountData | null
}

export type { ProfileUserProps }
