'use client'

import { useState } from 'react'
import { Box, Text } from '@radix-ui/themes'
import { Item } from '@radix-ui/themes/components/checkbox-group'
import { useToggle } from 'react-use'
import { ProfilesShape } from '@/types'
import { cn } from '@/utils/cn'

interface AlreadyProfilesProps {
  profiles: ProfilesShape[]
}

const AlreadyProfiles = ({ profiles }: AlreadyProfilesProps) => {
  const [expandedId, setExpandedId] = useState<string | null>('')
  return (
    <Box>
      {profiles.map((item, index) => {
        const isExpanded = expandedId === item._id
        return (
          <Box
            key={item._id}
            className={cn(
              'relative bottom-2 mt-4 flex translate-x-2 flex-col gap-2 rounded-lg border-2 border-gray-300 bg-white p-8 transition-all duration-300 ease-in-out',
              isExpanded ? 'h-auto' : 'h-30',
            )}
            onClick={() => setExpandedId(isExpanded ? null : item._id)}
          >
            <Text className="border-b border-black/40 pb-6 text-3xl font-bold">
              Anonyous Profile:{' '}
              <span className="ml-1 text-gray-600">{item.username}</span>
            </Text>

            {isExpanded && (
              <>
                <Box className="mt-3 rounded-lg bg-red-400"></Box>
                <Box className="mt-4 flex items-center justify-start rounded-md border p-4 text-lg font-semibold">
                  Full Name:{' '}
                  <Text className="ml-4 text-gray-600">{item?.fullName}</Text>
                </Box>
                <Box className="mt-4 flex items-center justify-start rounded-md border p-4 text-lg font-semibold">
                  Username:{' '}
                  <Text className="ml-4 text-gray-600">{item.username}</Text>
                </Box>
                <Box className="mt-4 flex items-center justify-start rounded-md border p-4 text-lg font-semibold">
                  Email:{' '}
                  <Text className="ml-4 text-gray-600">{item?.email}</Text>
                </Box>
                <Box className="mt-4 flex items-center justify-start rounded-md border p-4 text-lg font-semibold">
                  Profile Bio:{' '}
                  <Text className="ml-4 text-gray-600">{item?.bio}</Text>
                </Box>
              </>
            )}
          </Box>
        )
      })}
    </Box>
  )
}

export { AlreadyProfiles }
