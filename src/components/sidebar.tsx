'use client'

import React from 'react'
import { Label } from '@radix-ui/react-label'
import { Box } from '@radix-ui/themes'
import { HEADER_DROPDOWN_LABELS } from '@/constants/objects-to-iterate'

const Sidebar = () => {
  return (
    <Box className="flex h-full w-60 flex-col bg-white">
      <Box className="flex h-20 items-center justify-start pl-4">
        <Label className="w-full text-2xl font-bold">Kivo.chat</Label>
      </Box>
      <Box className="flex flex-1 flex-col items-center gap-2 px-3 pt-2">
        {HEADER_DROPDOWN_LABELS.map((lin, index) => {
          return (
            <Box
              key={index}
              className="item-center duration:300 flex w-full cursor-pointer gap-2 rounded-md p-1 text-center transition-all hover:bg-gray-100"
            >
              <Box className="p-2">{lin.icon}</Box>
              <Box className="flex items-center">{lin.label}</Box>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

export { Sidebar }
