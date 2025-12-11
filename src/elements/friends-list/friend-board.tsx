'use client'

import React from 'react'
import { Box, Flex } from '@radix-ui/themes'
import { BoardUpperHeader } from '@/components'

const FriendBoard = () => {
  return (
    <Box className="w-full">
      <Flex className="" direction="column"></Flex>
      <BoardUpperHeader NextHead={{label:"Networ", href=}} ButtonOne="Network"  />
    </Box>
  )
}

export { FriendBoard }
