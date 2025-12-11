'use client'

import React from 'react'
import { EmptyIcon } from './icons/empty'
import { RefreshIcon } from './icons/refresh'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from './ui/empty'
import { Button } from './ui/button'

const NoData = () => {
  return (
    <Empty className="">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <EmptyIcon />
        </EmptyMedia>
        <EmptyTitle>No Data Available.</EmptyTitle>
        <EmptyDescription>
          There is no data available at this moment.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button>
          <RefreshIcon />
          Refresh
        </Button>
      </EmptyContent>
    </Empty>
  )
}

export { NoData }
