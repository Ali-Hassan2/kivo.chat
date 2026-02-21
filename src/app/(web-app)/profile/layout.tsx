'use client'

import React from 'react'
import { Box } from '@radix-ui/themes'
import { Header, Sidebar } from '@/components'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box className="flex h-screen w-screen overflow-hidden bg-sky-100">
      <Box className="fixed top-0 left-0 h-screen w-60">
        <Sidebar />
      </Box>
      <Box className="ml-60 flex w-full flex-col">
        <Header bgColor="bg-white" />
        <Box className="ml-3 flex-1 overflow-y-auto">{children}</Box>
      </Box>
    </Box>
  )
}

export default Layout
