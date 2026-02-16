'use client'

import { useEffect, useMemo, useState } from 'react'
import { Avatar } from '@radix-ui/themes'
import { Search } from '@/components'
import { Label } from '@/components/ui/label'
import { SEARCH_NOT_FOUND_MESSAGE } from '@/constants'
import { MOCK_CONTACTS } from '@/constants/objects-to-iterate'
import { getAllContactsConversations } from '@/hooks'
import { useAuthRedirection } from '@/utils'
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
  const {
    initialConversations,
    isGettingCoversations,
    errorMessage,
    getAllConversations,
  } = getAllContactsConversations()

  useEffect(() => {
    getAllConversations()
  }, [])

  const allParticipants = useMemo(() => {
    return initialConversations.flatMap(
      (conversation) => conversation.participants,
    )
  }, [initialConversations])

  const allLastMessages = useMemo(() => {
    return initialConversations.map((conversation) => conversation.lastMessage)
  }, [initialConversations])

  const user = useAuthRedirection()
  const username = user?.username
  const filteredContactListBasedOnSearchQuery = useMemo(() => {
    return allParticipants.filter(
      (participant) =>
        participant.username !== username &&
        participant.fullName
          .toLowerCase()
          .includes(queryFullNameToGetFromSearchResult.toLowerCase()),
    )
  }, [allParticipants, queryFullNameToGetFromSearchResult])

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
        {filteredContactListBasedOnSearchQuery.map((contact) => {
          const conversation = initialConversations.find((conversation) => {
            return conversation.participants.some((p) => p._id === contact._id)
          })
          const lastMessage = conversation?.lastMessage?.content
          return (
            <div
              className="flex cursor-pointer gap-3 rounded-md p-2 hover:bg-gray-100"
              key={contact.fullName}
            >
              <Avatar
                fallback={contact.fullName?.[0]?.toUpperCase() ?? '?'}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-200 text-blue-700"
              />
              <Label className="text-black">{contact.fullName}</Label>
              <Label className="text-black">{lastMessage}</Label>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export { ContactBoard }
