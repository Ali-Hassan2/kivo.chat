'use client'

import { useRouter } from 'next/navigation'
import { Box, Flex, Text } from '@radix-ui/themes'

export default function NotFound() {
  const router = useRouter()

  return (
    <Flex
      align="center"
      justify="center"
      className="min-h-screen bg-gray-50 px-6"
    >
      <Box className="w-full max-w-md text-center">
        <Text
          as="h1"
          className="text-7xl font-extrabold tracking-tight text-gray-900"
        >
          404
        </Text>
        <Box className="my-6 h-px bg-gray-300" />
        <Text className="text-2xl font-semibold text-gray-800">
          Page not found
        </Text>
        <Text as="p" className="mt-3 text-gray-600">
          Sorry, the page you are looking for doesn’t exist or has been moved.
        </Text>
        <Flex align="center" justify="center" gap="3" className="mt-8">
          <button
            onClick={() => router.refresh()}
            className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 focus:outline-none"
          >
            Refresh Page
          </button>
          <button
            onClick={() => router.push('/')}
            className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100 focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 focus:outline-none"
          >
            Go Home
          </button>
        </Flex>
      </Box>
    </Flex>
  )
}
