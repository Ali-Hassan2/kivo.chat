'use client'

import React, { JSX } from 'react'
import Link from 'next/link'
import { Box } from '@radix-ui/themes'
import { FRIENDS_NETWORK_BOARD } from '@/constants'
import { cn } from '@/utils/cn'
import { Button } from './ui/button'
import { Label } from './ui/label'

interface BoardUpperProps {
  NextHead: string
  ButtonOne: {
    label: string
    href: string
    Icon: JSX.Element
  }
  ButtonTwo: {
    label: string
    href: string
  }
  lineWidth: string
  totalPendingRequests?: number
}

const BoardUpperHeader = ({
  NextHead,
  ButtonOne,
  ButtonTwo,
  lineWidth,
  totalPendingRequests,
}: BoardUpperProps): React.JSX.Element => {
  return (
    <Box className="flex h-40 items-center justify-between pl-4">
      <Box className="flex flex-col gap-2">
        <Label className="text-4xl font-semibold">Network {NextHead}</Label>
        <div className={cn(lineWidth, 'h-[1px] bg-gray-200')} />
      </Box>
      <Box className="relative flex gap-4 pr-3">
        <Box className="relative">
          <Button asChild variant="outline" className="cursor-pointer">
            <div className="flex items-center gap-2">
              {ButtonOne.Icon}
              <Link href={ButtonOne.href}>{ButtonOne.label}</Link>
            </div>
          </Button>
          <Box className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-black/90 text-xs font-semibold text-white">
            {totalPendingRequests}
          </Box>
        </Box>
        <Button
          asChild
          className="cursor-pointer bg-blue-700 hover:bg-blue-600"
        >
          <Link href={ButtonTwo.href}>{ButtonTwo.label ?? 'All Friends'}</Link>
        </Button>
      </Box>
    </Box>
  )
}

export { BoardUpperHeader }
