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
  const username = user?.username
  return (
    <div
      className={cn(
        'flex h-full w-80 flex-col items-center justify-start border-r p-4 pt-16',
      )}
    >
      <Card className="w-full shadow-xl">
        <CardHeader>
          <CardTitle>Profile Stats</CardTitle>
          <CardDescription>Your Public Stats here</CardDescription>
        </CardHeader>
        <div className="ml-4 h-[1px] w-4/5 bg-gray-200" />
        <Box className="flex w-full flex-col items-center justify-center gap-3">
          <Avatar
            fallback={username?.[0].toUpperCase() ?? '?'}
            className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-200 text-blue-800"
          />
          <Box className="flex flex-col items-center justify-center gap-2 px-2 text-center">
            <Label>{user?.fullName}</Label>
            <Label className="font-normal text-gray-700">{user?.bio}</Label>
          </Box>
        </Box>
        {/* TODO:// call get total friends api to get count. */}
        <Label className="mt-2 ml-3">Total Connections: 59</Label>
      </Card>
    </div>
  )
}

export { ProfileNetwork }
