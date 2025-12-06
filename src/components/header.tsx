'use client'

import React, { useEffect, useRef } from 'react'
import { Label } from '@radix-ui/react-label'
import { Avatar } from '@radix-ui/themes'
import { useToggle } from 'react-use'
import { HEADER_DROPDOWN_LABELS } from '@/constants/objects-to-iterate'
import { useAuthRedirection } from '@/utils'
import { cn } from '@/utils/cn'
import { ArrowDownIcon, ArrowUpIcon } from './icons/arrows'

interface HeaderProps {
  bgColor: string
}

const Header = ({ bgColor }: HeaderProps) => {
  const user = useAuthRedirection()
  const username = user?.username
  const [isDropDownOpned, setIsDropDownOpend] = useToggle(false)
  const dropDownRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropDownRef.current &&
        !dropDownRef.current?.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current?.contains(event.target as Node)
      ) {
        setIsDropDownOpend(false)
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [setIsDropDownOpend])

  return (
    <div
      className={cn(
        bgColor ?? 'white',
        'relative flex h-20 w-full items-center justify-between border shadow-xl',
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
            fallback={username?.[0].toUpperCase() ?? 'A'}
            className="flex h-12 w-12 flex-row items-center justify-center rounded-full bg-blue-200 text-blue-800"
          />
          {isDropDownOpned ? <ArrowDownIcon /> : <ArrowUpIcon />}
        </div>
      </div>

      <div
        ref={dropDownRef}
        className={cn(
          'absolute top-18 right-4 w-58 origin-top-right flex-col rounded-lg border bg-white shadow-lg transition-all duration-300 ease-in-out',
          isDropDownOpned
            ? 'visible scale-y-100 opacity-100'
            : 'invisible scale-y-0 opacity-0',
        )}
      >
        <div className="flex flex-1 items-center justify-start gap-3 rounded-t-lg py-3 pl-2">
          <Avatar
            fallback={username?.[0].toUpperCase() ?? 'A'}
            className="flex h-12 w-12 flex-row items-center justify-center rounded-full bg-blue-200 text-blue-800"
          />
          <Label>{username}</Label>
        </div>
        <div className="h-[1px] bg-black/20" />
        <div className="flex flex-col gap-2 p-2">
          {HEADER_DROPDOWN_LABELS.map((licon) => (
            <div
              key={licon.label}
              className="flex cursor-pointer gap-3 rounded-md border border-transparent py-3 pl-2 transition-colors duration-300 ease-in-out hover:border-blue-600 hover:bg-blue-100"
            >
              <div>{licon.icon}</div>
              <Label>{licon.label}</Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export { Header }
