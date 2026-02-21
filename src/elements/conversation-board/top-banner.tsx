import { Box } from '@radix-ui/themes'
import { SkeletonWrapper } from '@/components'
import { cn } from '@/utils/cn'

interface TopBannerProps {
  loading: boolean
}
const TopBannerSkeleton = ({ loading }: TopBannerProps) => {
  return (
    <SkeletonWrapper loading={loading}>
      <Box className={cn('h-12 w-20 animate-pulse bg-gray-100')}></Box>
    </SkeletonWrapper>
  )
}

export { TopBannerSkeleton }
