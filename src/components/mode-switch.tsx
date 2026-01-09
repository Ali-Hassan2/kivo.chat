'use client'

import * as React from 'react'
import { Switch } from './ui/switch'

export interface SwitchDemoProps extends React.ComponentProps<typeof Switch> {
  /** Controlled checked value (boolean) */
  checked?: boolean
  /** Handler when checked state changes */
  onCheckedChange?: (checked: boolean) => void
  /** Disable the control */
  disabled?: boolean
}

/**
 * SwitchDemo
 *
 * Example (react-hook-form Controller):
 * <Controller
 *   control={control}
 *   name="isAcceptingMessages"
 *   render={({ field }) => (
 *     <SwitchDemo checked={field.value} onCheckedChange={field.onChange} />
 *   )}
 * />
 */
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

export { SwitchDemo }
