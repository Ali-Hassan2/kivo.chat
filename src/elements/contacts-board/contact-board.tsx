'use client'

import { useMemo, useState } from 'react'
import { Avatar } from '@radix-ui/themes'
import { Search } from '@/components'
import { Label } from '@/components/ui/label'
import { MOCK_CONTACTS } from '@/constants/objects-to-iterate'
import { cn } from '@/utils/cn'

const ContactBoard = () => {
  const [
    queryFullNameToGetFromSearchResult,
    setQueryFullNameToGetFromSearchResult,
  ] = useState<string>('')

  const FilteredContactConversationList = useMemo(() => {
    return MOCK_CONTACTS.filter((contact) =>
      contact.FullName.toLowerCase().includes(
        queryFullNameToGetFromSearchResult.toLowerCase(),
      ),
    )
  }, [queryFullNameToGetFromSearchResult])
  return (
    <div
      className={cn(
        'flex h-full w-80 flex-col overflow-y-auto border-r bg-white pt-16',
      )}
    >
      <Search />
      <div className="flex flex-col gap-3 px-2 pb-4">
        {FilteredContactConversationList.map((mc) => (
          <div
            className="flex cursor-pointer gap-3 rounded-md p-2 hover:bg-gray-100"
            key={mc.FullName}
          >
            <Avatar
              fallback={mc.FullName?.[0]?.toUpperCase() ?? '?'}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-200 text-blue-700"
            />
            <Label className="text-black">{mc.FullName}</Label>
          </div>
        ))}
      </div>
    </div>
  )
}

export { ContactBoard }
