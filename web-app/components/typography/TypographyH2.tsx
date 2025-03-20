import React from 'react'
import { cn } from '@/lib/utils'

type TypographyH2Props = {
  children: React.ReactNode
  className?: string
}

export function TypographyH2({ children, className }: TypographyH2Props) {
  return (
    <h2 className={cn(`scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-foreground`, className)}>
      {children}
    </h2>
  )
}
