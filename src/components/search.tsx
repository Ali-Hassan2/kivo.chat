'use client'

import React from 'react'
import { Box } from '@radix-ui/themes'
import { SearchIcon } from './icons/search'
import { Input } from './ui/input'

const Search = () => {
  return (
    <Box className="relative mb-3 ml-4 w-[90%]">
      <Box className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500">
        <SearchIcon className="h-4 w-4" />
      </Box>

      <Input
        type="text"
        placeholder="Search..."
        className="rounded-md border border-gray-300 py-2 pr-3 pl-10 text-black focus-visible:ring-0 focus-visible:ring-offset-0"
      />
    </Box>
  )
}

export { Search }
