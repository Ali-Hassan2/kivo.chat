import { Box } from '@radix-ui/themes'
import { SkeletonWrapper } from '@/components'

interface ProfileCreationSkeletonProps {
  items: number[]
  loading: boolean
}

const ProfileCreationSkeleton = ({
  items,
  loading,
}: ProfileCreationSkeletonProps) => {
  return (
    <SkeletonWrapper loading={loading}>
      {items.map(() => {
        return (
          <Box className="mt-3 h-30 w-full animate-pulse rounded-lg bg-white/70"></Box>
        )
      })}
    </SkeletonWrapper>
  )
}

export { ProfileCreationSkeleton }
