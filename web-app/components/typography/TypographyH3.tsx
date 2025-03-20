import React from 'react'
import { cn } from '@/lib/utils'

type TypographyH3Props = {
  children: React.ReactNode
  className?: string
}

export function TypographyH3({ children, className }: TypographyH3Props) {
  return (
    <h3 className={cn(`scroll-m-20 text-2xl font-semibold tracking-tight text-foreground`, className)}>
      {children}
    </h3>
  )
}
