'use client'

import { PropsWithChildren } from 'react'
import Skeleton, { SkeletonProps } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

interface SkeletonWrapperProps extends PropsWithChildren, SkeletonProps {
  loading: boolean
}

const SkeletonWrapper = ({
  loading,
  children,
  ...rest
}: SkeletonWrapperProps) => {
  if (loading) {
    // Just render children as they are, so you can use a skeleton layout inside children
    return <>{children}</>
  }

  return children
}

export { SkeletonWrapper }
