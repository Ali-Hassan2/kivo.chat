import { Avatar, Box } from '@radix-ui/themes'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { useAuthRedirection } from '@/utils'
import { cn } from '@/utils/cn'

const ProfileNetwork = () => {
  const user = useAuthRedirection()
  console.log('The user data is:', user)
  const username = user?.username
  return (
    <div className={cn('flex h-full w-80 flex-col items-center border-4')}>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Profile Stats</CardTitle>
          <CardDescription>Your Public Stats here</CardDescription>
        </CardHeader>
        <div className="ml-4 h-[1px] w-4/5 bg-gray-200" />
        <Box className="flex w-full gap-2 border-4">
          <Avatar
            fallback={username?.[0].toUpperCase() ?? '?'}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-200 text-blue-800"
          />
          <Label>{user?.fullName}</Label>
        </Box>
      </Card>
    </div>
  )
}

export { ProfileNetwork }
