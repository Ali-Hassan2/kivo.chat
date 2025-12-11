import React from 'react'
import { Box } from '@radix-ui/themes'
import { Button } from './ui/button'
import { Label } from './ui/label'

const NetworkBoardUpperHeader = () => {
  return (
    <Box className="flex h-40 items-center justify-between pl-4">
      <Box className="flex flex-col gap-2">
        <Label className="text-4xl font-semibold">Network.</Label>
        <div className="h-[1px] w-40 bg-gray-200" />
      </Box>
      <Box className="flex gap-4 pr-3">
        <Button className="cursor-pointer">Pending Requests</Button>
        <Button className="cursor-pointer bg-blue-700 hover:bg-blue-600">
          All Friends
        </Button>
      </Box>
    </Box>
  )
}

export { NetworkBoardUpperHeader }
