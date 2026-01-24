'use client'

import React from 'react'
import { Box } from '@radix-ui/themes'
import { Sidebar } from '@/components'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box className="flex min-h-screen bg-sky-100">
      <Box className="fixed top-0 left-0 h-screen w-60 flex-shrink-0">
        <Sidebar />
      </Box>
      <Box className="ml-60 flex-1 overflow-auto">{children}</Box>
    </Box>
  )
}

export default Layout
