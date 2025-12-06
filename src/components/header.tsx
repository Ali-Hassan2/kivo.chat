'use client'

import React, { useEffect, useRef } from 'react'
import { Label } from '@radix-ui/react-label'
import { Avatar, Box, Flex } from '@radix-ui/themes'
import { useToggle } from 'react-use'
import { HEADER_DROPDOWN_LABELS } from '@/constants/objects-to-iterate'
import { useAuthRedirection } from '@/utils'
import { cn } from '@/utils/cn'
import { ArrowDownIcon, ArrowUpIcon } from './icons/arrows'

interface HeaderProps {
  bgColor: string
}

const Header = ({ bgColor }: HeaderProps) => {
  // const user = useAuthRedirection()
  // const username = user?.username
  const [isDropDownOpned, setIsDropDownOpend] = useToggle(false)
  const dropDownRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)

  return (
    <div
      className={cn(
        bgColor ?? 'white',
        'flex h-20 w-full items-center justify-between border shadow-lg',
      )}
    >
      <div className="flex h-full flex-1 items-center justify-start pl-8 pl-12 font-bold">
        <Label className="text-4xl font-bold">K.</Label>
      </div>
      <div className="flex h-full flex-1 cursor-pointer items-center justify-end pr-12">
        <div
          className="relative flex items-center justify-center gap-3"
          onClick={setIsDropDownOpend}
          ref={triggerRef}
        >
          <Avatar
            // fallback={username?.[0].toUpperCase() ?? 'A'}
            fallback="A"
            className="flex h-12 w-12 flex-row items-center justify-center rounded-full bg-blue-200 text-blue-800"
          />
          {isDropDownOpned ? <ArrowDownIcon /> : <ArrowUpIcon />}
        </div>
      </div>

      {isDropDownOpned && (
        <div
          ref={dropDownRef}
          className="absolute top-18 right-8 w-58 flex-col rounded-lg bg-red-500"
        >
          <div className="flex flex-1 items-center justify-start gap-3 rounded-t-lg bg-blue-500 py-3 pl-2">
            <Avatar
              // fallback={username?.[0].toUpperCase() ?? 'A'}
              fallback="A"
              className="flex h-12 w-12 flex-row items-center justify-center rounded-full bg-blue-200 text-blue-800"
            />
            <Label>username</Label>
          </div>
          <div className="h-[1px] bg-black/20" />
          <div>
            {HEADER_DROPDOWN_LABELS.map((licon) => {
              return (
                <div className="">
                  <div>{licon.icon}</div>
                  <Label>{licon.label}</Label>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export { Header }
