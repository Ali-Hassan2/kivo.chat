'use client'

import React from 'react'
import { Box, Text } from '@radix-ui/themes'
import { ProfileUserProps } from './types'

const RealIdentityBox = ({
  fullName,
  username,
  email,
  bio,
}: ProfileUserProps) => {
  return (
    <Box className="duration:300 flex flex-col gap-2 rounded-lg border-2 border-gray-300 bg-white p-8 transition-all ease-in-out">
      <Text className="border-b border-black/40 pb-6 text-3xl font-bold">
        User Original Identity
      </Text>
      <Box className="mt-4 flex items-center justify-start rounded-md border p-4 text-lg font-semibold">
        Full Name: <Text className="ml-4 text-gray-600">{fullName}</Text>
      </Box>
      <Box className="mt-4 flex items-center justify-start border p-4 text-lg font-semibold">
        Username: <Text className="ml-4 text-gray-600">{username}</Text>
      </Box>
      <Box className="mt-4 flex items-center justify-start border p-4 text-lg font-semibold">
        Email: <Text className="ml-4 text-gray-600">{email}</Text>
      </Box>
      <Box className="mt-4 flex items-center justify-start border p-4 text-lg font-semibold">
        Profile Bio: <Text className="ml-4 text-gray-600">{bio}</Text>
      </Box>
    </Box>
  )
}

export { RealIdentityBox }
