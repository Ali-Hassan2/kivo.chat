'use client'

import { ContactBoard, ConversationBoard } from '@/elements'
import { cn } from '@/utils/cn'
import { Conversation } from '@/views/conversation'

const page = () => {
  return (
    <div className="flex h-full w-full">
      <ContactBoard />
      <div className="flex-1">
        <Conversation />
      </div>
    </div>
  )
}

export default page
