'use client'

import { useEffect, useMemo, useState } from 'react'
import { Avatar } from '@radix-ui/themes'
import { Search } from '@/components'
import { Label } from '@/components/ui/label'
import { SEARCH_NOT_FOUND_MESSAGE } from '@/constants'
import { MOCK_CONTACTS } from '@/constants/objects-to-iterate'
import { cn } from '@/utils/cn'

const ContactBoard = () => {
  const [
    queryFullNameToGetFromSearchResult,
    setQueryFullNameToGetFromSearchResult,
  ] = useState<string>('')
  const [
    noResultMessageToDisplayWhenSearchYieldsNoResults,
    setNoResultMessageToDisplayWhenSearchYieldsNoResults,
  ] = useState<string>('')

  const filteredContactListBasedOnSearchQuery = useMemo(() => {
    return MOCK_CONTACTS.filter((contact) =>
      contact.FullName.toLowerCase().includes(
        queryFullNameToGetFromSearchResult.toLowerCase(),
      ),
    )
  }, [queryFullNameToGetFromSearchResult])

  useEffect(() => {
    if (filteredContactListBasedOnSearchQuery.length === 0) {
      setNoResultMessageToDisplayWhenSearchYieldsNoResults(
        SEARCH_NOT_FOUND_MESSAGE,
      )
    } else {
      setNoResultMessageToDisplayWhenSearchYieldsNoResults('')
    }
  }, [filteredContactListBasedOnSearchQuery])

  return (
    <div
      className={cn(
        'flex h-full w-80 flex-col overflow-y-auto border-r bg-white pt-8',
      )}
    >
      <Search onSearchFieldResponse={setQueryFullNameToGetFromSearchResult} />
      {noResultMessageToDisplayWhenSearchYieldsNoResults && (
        <p className="py-4 text-center text-gray-500">
          {noResultMessageToDisplayWhenSearchYieldsNoResults}
        </p>
      )}
      <div className="flex flex-col gap-3 px-2 pb-4">
        {filteredContactListBasedOnSearchQuery.map((contact) => (
          <div
            className="flex cursor-pointer gap-3 rounded-md p-2 hover:bg-gray-100"
            key={contact.FullName}
          >
            <Avatar
              fallback={contact.FullName?.[0]?.toUpperCase() ?? '?'}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-200 text-blue-700"
            />
            <Label className="text-black">{contact.FullName}</Label>
          </div>
        ))}
      </div>
    </div>
  )
}

export { ContactBoard }
