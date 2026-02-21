'use client'

import React from 'react'
import Image from 'next/image'
import { Box, Text } from '@radix-ui/themes'
import tickMark from '../../public/tick-mark.png'
import xMark from '../../public/x-mark.png'
import { ProfileUserProps } from './types'

const RealIdentityBox = ({
  fullName,
  username,
  email,
  bio,
  countData,
}: ProfileUserProps) => {
  return (
    <Box className="mt-3 rounded-lg bg-yellow-400">
      <Box className="relative bottom-2 flex translate-x-2 flex-col gap-2 rounded-lg border-2 border-gray-300 bg-white p-8 transition-all duration-300 ease-in-out">
        <Text className="border-b border-black/40 pb-6 text-3xl font-bold">
          User Original Identity
        </Text>
        <Box className="mt-3 rounded-lg bg-red-400">
          <Box className="relative bottom-1 flex items-center justify-between rounded-lg border bg-white">
            <Text className="p-2 text-2xl font-semibold">Selected:</Text>
            {countData?.isOriginal ? (
              <Image src={tickMark} alt="active" height={70} width={70} />
            ) : (
              <Image src={xMark} alt="active" height={70} width={70} />
            )}
          </Box>
        </Box>
        <Box className="mt-4 flex items-center justify-start rounded-md border p-4 text-lg font-semibold">
          Full Name: <Text className="ml-4 text-gray-600">{fullName}</Text>
        </Box>
        <Box className="mt-4 flex items-center justify-start rounded-md border p-4 text-lg font-semibold">
          Username: <Text className="ml-4 text-gray-600">{username}</Text>
        </Box>
        <Box className="mt-4 flex items-center justify-start rounded-md border p-4 text-lg font-semibold">
          Email: <Text className="ml-4 text-gray-600">{email}</Text>
        </Box>
        <Box className="mt-4 flex items-center justify-start rounded-md border p-4 text-lg font-semibold">
          Profile Bio: <Text className="ml-4 text-gray-600">{bio}</Text>
        </Box>
      </Box>
    </Box>
  )
}

export { RealIdentityBox }
