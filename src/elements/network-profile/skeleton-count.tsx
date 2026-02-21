import { SkeletonWrapper } from '@/components'
import { cn } from '@/utils/cn'

interface SkeletonCount {
  loading: boolean
  width?: string
}

const CountSkeleton = ({ loading, width }: SkeletonCount) => {
  return (
    <SkeletonWrapper loading={loading}>
      <div
        className={cn(
          'inline-block',
          width ?? 'w-2',
          'h-4 animate-pulse rounded-full bg-gray-200',
        )}
      ></div>
    </SkeletonWrapper>
  )
}

export { CountSkeleton }
