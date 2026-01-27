'use client'

import React, { PropsWithChildren } from 'react'
import { usePathname } from 'next/navigation'
import { Box, Flex } from '@radix-ui/themes'
import { Header } from '@/components/header'
import { EXCLUDED_PAGES } from '@/constants'

const GeneralLayout = ({ children }: Readonly<PropsWithChildren>) => {
  const pathName = usePathname()
  if (EXCLUDED_PAGES.includes(pathName)) {
    return <>{children}</>
  }

  return (
    <Flex className="h-screen w-[100vw]">
      <Header bgColor="bg-white" />
      <Flex direction="row" className="flex-1 overflow-hidden bg-white">
        <Box className="flex-1 overflow-y-auto">{children}</Box>
      </Flex>
    </Flex>
  )
}

export default GeneralLayout
