'use client'

import * as React from 'react'
import { Switch } from './ui/switch'

export interface SwitchDemoProps extends React.ComponentProps<typeof Switch> {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
}

export function SwitchDemo({
  checked,
  onCheckedChange,
  disabled = false,
  className,
  ...props
}: SwitchDemoProps) {
  return (
    <div className="flex cursor-pointer items-center space-x-2">
      <Switch
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        className={'h-[20px] w-[33px] cursor-pointer ' + (className ?? '')}
        {...props}
      />
    </div>
  )
}
