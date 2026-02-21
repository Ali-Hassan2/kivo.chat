'use client'

import React from 'react'
import { EmptyIcon } from './icons/empty'
import { RefreshIcon } from './icons/refresh'
import { Button } from './ui/button'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from './ui/empty'

const NoData = () => {
  return (
    // TODO: please add a rounded shape circle behind the no data logo
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
