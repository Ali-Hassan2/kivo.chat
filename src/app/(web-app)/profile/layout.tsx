'use client'

import React from 'react'
import { Box } from '@radix-ui/themes'
import { Sidebar } from '@/components'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box className="flex h-screen w-full">
      <Box className="shrink-0">
        <Sidebar />
      </Box>
      <main>{children}</main>
    </Box>
  )
}

export default layout
