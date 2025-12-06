'use client'

import React from 'react'
import { NetworkBoard, ProfileNetwork } from '@/elements'
import { cn } from '@/utils/cn'

interface NetworkProps {
  height: string
}
const Network = ({ height }: NetworkProps) => {
  return (
    <div className={cn(height, 'flex')}>
      <ProfileNetwork />
      <NetworkBoard />
    </div>
  )
}

export { Network }
