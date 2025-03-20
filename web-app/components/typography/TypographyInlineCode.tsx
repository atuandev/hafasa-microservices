import React from 'react'
import { cn } from '@/lib/utils'

type TypographyInlineCodeProps = {
  children: React.ReactNode
  className?: string
}

export function TypographyInlineCode({ children, className }: TypographyInlineCodeProps) {
  return (
    <code className={cn(`relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold`, className)}>
      {children}
    </code>
  )
}
