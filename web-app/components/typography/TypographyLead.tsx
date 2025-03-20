import React from 'react'
import { cn } from '@/lib/utils'

type TypographyLeadProps = {
  children: React.ReactNode
  className?: string
}

export function TypographyLead({ children, className }: TypographyLeadProps) {
  return (
    <p className={cn(`text-xl text-muted-foreground`, className)}>
      {children}
    </p>
  )
}
