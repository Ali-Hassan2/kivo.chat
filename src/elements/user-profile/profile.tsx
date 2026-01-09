import React from 'react'
import { Box } from '@radix-ui/themes'
import { Label } from '@/components/ui/label'
import { useAuthRedirection } from '@/utils'

const ProfileBoard = () => {
  const user = useAuthRedirection()
  return (
    <Box className="flex flex-col items-center justify-center">
      <Box className="section flex w-full items-center justify-start border-b p-8">
        <Label className="text-3xl font-semibold">
          Welcome, {user?.fullName} to your Kivo Profile.
        </Label>
      </Box>
      <Box className="flex flex-col items-center justify-center">
        <Box>
            <Avatar fallback={user.username?.[0].toUpperCase()}/>
        </Box>
      </Box>
    </Box>
  )
}

export default ProfileBoard
