'use client'

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Label } from '@radix-ui/react-label'
import { Avatar, Box } from '@radix-ui/themes'
import { useToggle } from 'react-use'
import {
  HEADER_DROPDOWN_LABELS,
  HEADER_LINKS,
} from '@/constants/objects-to-iterate'
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
        'relative flex h-auto w-full flex-col items-center justify-between border shadow-xl md:flex-row',
      )}
    >
      <div className="flex h-full w-full flex-1 items-center justify-evenly py-4 pl-4 font-bold md:w-auto md:pl-12">
        <Label className="-ml-4 text-3xl font-bold md:text-4xl">K.</Label>
        <Box className="flex max-w-[65%] items-center gap-2 text-sm sm:max-w-[75%] md:max-w-full md:text-base">
          <Box className="h-4 w-4">
            <Image
              src="/dotpng.png"
              alt="green enabled"
              width={16}
              height={16}
              style={{ objectFit: 'contain' }}
            />
          </Box>
          <Label className="hidden font-normal sm:block">
            Kivo-chat engine is enabled you can communicate with those to whom
            you love. |
          </Label>
        </Box>
      </div>

      <div className="flex h-full w-full flex-1 cursor-pointer items-center justify-between p-3 md:w-auto md:pr-12">
        <div className="hidden h-full gap-8 md:flex lg:gap-12">
          {HEADER_LINKS.map((link) => {
            return (
              <Link
                key={link.href}
                href={link.href}
                className="flex h-full flex-row items-center gap-2 rounded-full px-2 py-2 text-sm outline-none hover:border-b lg:text-base"
              >
                {link.icon}
                {link.label}
              </Link>
            )
          })}
        </div>
        <div
          className="relative ml-auto flex items-center justify-center gap-3 md:ml-0"
          onClick={setIsDropDownOpend}
          ref={triggerRef}
        >
          <Avatar
            fallback={username?.[0].toUpperCase() ?? 'A'}
            className="flex h-10 w-10 flex-row items-center justify-center rounded-full bg-blue-200 text-blue-800 md:h-12 md:w-12"
          />
          {isDropDownOpned ? <ArrowDownIcon /> : <ArrowUpIcon />}
        </div>
      </div>

      <div
        ref={dropDownRef}
        className={cn(
          'absolute top-20 right-4 z-50 w-48 origin-top-right flex-col rounded-lg border bg-white shadow-lg transition-all duration-300 ease-in-out sm:w-56',
          isDropDownOpned
            ? 'visible scale-y-100 opacity-100'
            : 'invisible scale-y-0 opacity-0',
        )}
      >
        <div className="flex flex-1 items-center justify-start gap-3 rounded-t-lg py-3 pl-2">
          <Avatar
            fallback={username?.[0].toUpperCase() ?? 'A'}
            className="flex h-10 w-10 flex-row items-center justify-center rounded-full bg-blue-200 text-blue-800 md:h-12 md:w-12"
          />
          <Label className="text-sm md:text-base">{username}</Label>
        </div>
        <div className="h-[1px] bg-black/20" />
        <div className="flex flex-col gap-2 p-2">
          {HEADER_DROPDOWN_LABELS.map((licon) => (
            <Link
              key={licon.label}
              href={licon.href ?? '#'}
              className="flex gap-3 rounded-md border border-transparent py-2 pl-2 text-sm transition-colors duration-300 ease-in-out hover:border-blue-600 hover:bg-blue-100 md:py-3 md:text-base"
            >
              <div>{licon.icon}</div>
              <Label>{licon.label}</Label>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export { Header }
