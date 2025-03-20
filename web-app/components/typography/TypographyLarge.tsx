import React from 'react'
import { cn } from '@/lib/utils'

type TypographyLargeProps = {
  children: React.ReactNode
  className?: string
}

export function TypographyLarge({ children, className }: TypographyLargeProps) {
  return (
    <div className={cn(`text-lg font-semibold text-foreground`, className)}>
      {children}
    </div>
  )
}
