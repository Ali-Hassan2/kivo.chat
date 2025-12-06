'use client'

import { ContactBoard } from '@/elements'
import { cn } from '@/utils/cn'

const page = () => {
  return (
    <div className={cn('text-white')}>
      <ContactBoard />
    </div>
  )
}

export default page
