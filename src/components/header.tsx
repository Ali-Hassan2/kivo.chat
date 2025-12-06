'use client'

import React, { useEffect } from 'react'
import { Label } from '@radix-ui/react-label'
import { Avatar, Box, Flex } from '@radix-ui/themes'
import { useSession } from 'next-auth/react'
import { AUTH } from '@/constants'
import { useNavigation } from '@/utils'
import { cn } from '@/utils/cn'

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
    <Box className={cn(bgColor ?? 'bg-white', 'sticky py-4 shadow-lg')}>
      <Flex direction="row" className="items-center justify-between">
        <Box className="border-4">
          <Label className="pl-6 text-4xl font-bold">K.</Label>
        </Box>

        <Flex
          direction="row"
          align="center"
          justify="end"
          className="h-full cursor-pointer"
        >
          <Box className="flex items-center gap-2 border-4">
            <Avatar
              fallback={username?.[0].toUpperCase() ?? "A"}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-200 text-blue-600"
            />
            <Label>Hello</Label>
          </Box>
        </Flex>
      </Flex>
    </Box>
  )
}

export { Header }
