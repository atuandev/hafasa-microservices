import React from 'react'
import { cn } from '@/lib/utils'

type TypographyH4Props = {
  children: React.ReactNode
  className?: string
}

export function TypographyH4({ children, className }: TypographyH4Props) {
  return (
    <h4 className={cn(`scroll-m-20 text-xl font-semibold tracking-tight text-foreground`, className)}>
      {children}
    </h4>
  )
}
