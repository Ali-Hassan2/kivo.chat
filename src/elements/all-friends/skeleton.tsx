'use client'

import React from 'react'
import { Avatar, Box, Button, Flex } from '@radix-ui/themes'
import { SkeletonWrapper } from '@/components'
import { Label } from '@/components/ui/label'

interface ListSkeletonProps {
  loading: boolean
  items?: number
}

const ListSkeleton = ({ loading, items = 5 }: ListSkeletonProps) => {
  return (
    <SkeletonWrapper loading={loading}>
      <Box className="lists flex w-full animate-pulse flex-col gap-4 border-gray-200 px-2 py-4">
        {Array.from({ length: items }).map((_, index) => (
          <Box
            key={index}
            className="flex animate-pulse items-center justify-between gap-3 rounded-md border border-gray-200 bg-gray-100 p-3"
          >
            <Flex className="items-center gap-2">
              <Label className="h-12 w-12 rounded-full bg-gray-200"></Label>
              <Label className="mt-3 h-4 w-84 rounded bg-gray-200 text-lg">
                &nbsp;
              </Label>
            </Flex>
            <Flex className="flex gap-4">
              <Button className="h-10 w-24 animate-pulse cursor-not-allowed rounded-lg bg-gray-200 opacity-50"></Button>
              <Button className="h-10 w-24 animate-pulse cursor-not-allowed rounded-lg bg-gray-200 opacity-50"></Button>
            </Flex>
          </Box>
        ))}
      </Box>
    </SkeletonWrapper>
  )
}

export default ListSkeleton
