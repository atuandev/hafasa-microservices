import React from 'react'
import { cn } from '@/lib/utils'

type TypographySmallProps = {
  children: React.ReactNode
  className?: string
}

export function TypographySmall({ children, className }: TypographySmallProps) {
  return (
    <small className={cn(`text-sm font-medium leading-none text-foreground`, className)}>
      {children}
    </small>
  )
}
