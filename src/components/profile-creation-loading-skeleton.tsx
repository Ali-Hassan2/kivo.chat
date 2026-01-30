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
  console.log('The items are:', items)
  console.log('The loading state is:', loading)
  return (
    <SkeletonWrapper loading={loading}>
      {items.map(() => {
        return <Box className="w-full animate-pulse bg-gray-200"></Box>
      })}
    </SkeletonWrapper>
  )
}

export { ProfileCreationSkeleton }
