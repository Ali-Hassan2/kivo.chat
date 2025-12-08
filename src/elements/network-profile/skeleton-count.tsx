import { SkeletonWrapper } from '@/components'
import { cn } from '@/utils/cn'

interface SkeletonCount {
  loading: boolean
  width?: string
}

const CountSkeleton = ({ loading, width }: SkeletonCount) => {
  return (
    <SkeletonWrapper loading={loading}>
      <div className={cn(width ?? 'w-16', 'h-16 rounded-full')}></div>
    </SkeletonWrapper>
  )
}

export { CountSkeleton }
