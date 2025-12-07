import React from 'react'
import Skeleton from 'react-loading-skeleton'
import { SkeletonWrapper } from '@/components'

interface GridSkeletonProps {
  gettingAllUsersForNetworkConnections: boolean
}

const GridSkeleton = ({
  gettingAllUsersForNetworkConnections,
}: GridSkeletonProps) => {
  return (
    <SkeletonWrapper loading={!gettingAllUsersForNetworkConnections}>
      <div className="grid grid-cols-4 gap-5 p-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="flex animate-pulse flex-col items-center rounded-md border border-gray-200 p-3"
          >
            <Skeleton circle height={48} width={48} />
            <Skeleton className="mt-2" height={16} width={80} />
            <Skeleton className="mt-2" height={20} width={120} />
            <Skeleton className="mt-4 rounded-full" height={60} width="100%" />
          </div>
        ))}
      </div>
    </SkeletonWrapper>
  )
}

export { GridSkeleton }
