import React from 'react'
import { ProfileNetwork } from '@/elements'
import { cn } from '@/utils/cn'

interface FriendsViewProps {
  height: string
}

const FriendsView = ({ height }: FriendsViewProps) => {
  return <div className={cn(height, 'flex')}>{/* <ProfileNetwork /> */}</div>
}

export { FriendsView }
