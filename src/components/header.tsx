'use client'

import React, { useEffect } from 'react'
import { Label } from '@radix-ui/react-label'
import { Avatar, Box, Flex } from '@radix-ui/themes'
import { useSession } from 'next-auth/react'
import { AUTH } from '@/constants'
import { useNavigation } from '@/utils'
import { cn } from '@/utils/cn'
import { ArrowDownIcon } from './icons/arrows'

interface HeaderProps {
  bgColor: string
}

const Header = ({ bgColor }: HeaderProps) => {
  const { data: session } = useSession()
  const { navigateTo } = useNavigation()

  useEffect(() => {
    if (!session || !session.user) {
      ;(setTimeout(() => navigateTo(AUTH)), 1000)
    }
  })

  const username = session?.user.username
  return (
    <div
      className={cn(
        bgColor ?? 'white',
        'flex h-20 w-full items-center justify-between border shadow-lg',
      )}
    >
      <div className="flex h-full flex-1 items-center justify-start pl-8 pl-12 font-bold">
        <Label className="text-4xl font-bold">K.</Label>
      </div>
      <div className="flex h-full flex-1 items-center justify-end pr-12">
        <div className="flex items-center justify-center gap-3">
          <Avatar
            fallback={username?.[0].toUpperCase() ?? 'A'}
            className="flex h-12 w-12 flex-row items-center justify-center rounded-full bg-blue-200 text-blue-800"
          />
<ArrowDownIcon/>
        </div>
      </div>
    </div>
  )
}

export { Header }
