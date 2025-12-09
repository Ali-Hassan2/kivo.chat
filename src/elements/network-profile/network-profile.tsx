import { Avatar, Box } from '@radix-ui/themes'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { AuthStatus } from '@/types'
import { useAuthRedirection } from '@/utils'
import { cn } from '@/utils/cn'
import { CountSkeleton } from './skeleton-count'

interface NetworkProfileProps {
  userCountObtainedFromNetwork: number
  isGettingUserNetworkCount: boolean
  userCountResponseStatusForNetwork: AuthStatus
}

const ProfileNetwork = ({
  userCountObtainedFromNetwork,
  isGettingUserNetworkCount,
  userCountResponseStatusForNetwork,
}: NetworkProfileProps) => {
  const user = useAuthRedirection()
  const username = user?.username
  console.log('The users count:', userCountObtainedFromNetwork)
  return (
    <div
      className={cn(
        'flex h-full w-80 flex-col items-center justify-start border-r px-2 pt-16',
      )}
    >
      <Card className="w-full p-4 shadow-xl">
        <CardHeader>
          <CardTitle className="-ml-4">Profile Stats</CardTitle>
          <CardDescription className="-ml-4">
            Your Public Stats here
          </CardDescription>
        </CardHeader>
        <div className="ml-4 h-[1px] w-4/5 bg-gray-200" />
        <Box className="flex w-full flex-col items-center justify-center gap-3">
          <Avatar
            fallback={username?.[0].toUpperCase() ?? '?'}
            className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-200 text-4xl text-blue-800"
          />
          <Box className="flex flex-col items-center justify-center gap-2 px-2 text-center">
            <Label>{user?.fullName}</Label>
            <Label className="font-normal text-gray-700">{user?.bio}</Label>
          </Box>
        </Box>
        {isGettingUserNetworkCount ? (
          <CountSkeleton width="8" loading={isGettingUserNetworkCount} />
        ) : (
          <Label className="mt-2 ml-3">
            Total Connections: {userCountObtainedFromNetwork}
          </Label>
        )}
      </Card>
    </div>
  )
}

export { ProfileNetwork }
