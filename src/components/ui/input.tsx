import * as React from 'react'
import { cn } from '@/lib/utils'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base md:text-sm',
        'placeholder:text-muted-foreground',
        'outline-none',
        'focus-visible:ring-0 focus-visible:ring-offset-0',
        'focus-visible:border-input',
        'focus:bg-transparent active:bg-transparent',
        'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
        'aria-invalid:border-destructive aria-invalid:ring-0',

        className,
      )}
      {...props}
    />
  )
}

export { Input }
