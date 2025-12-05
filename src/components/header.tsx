'use client'

import React from 'react'
import { Label } from '@radix-ui/react-label'
import { Avatar, Box, Flex } from '@radix-ui/themes'
import { cn } from '@/utils/cn'

interface HeaderProps {
  bgColor: string
}

const Header = ({ bgColor }: HeaderProps) => {
  return (
    <Box className={cn(bgColor ?? 'bg-white', 'sticky py-4 shadow-lg')}>
      <Flex className="flex flex-row items-center justify-between">
        <Box className="flex-1 border-4">
          <Label className="pl-6 text-4xl font-bold">K.</Label>
        </Box>

        <Flex
          direction="row"
          align="center"
          gap="8"
          className="flex-1 cursor-pointer items-center justify-center border-4"
        >
          <Avatar fallback="A" className="bg-blue-200" />
          <Label>Hello</Label>
        </Flex>
      </Flex>
    </Box>
  )
}

export { Header }
