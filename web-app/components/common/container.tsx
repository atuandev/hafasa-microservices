import { cn } from '@/lib/utils'

type ContainerProps = {
  className?: string
  children: React.ReactNode
}

export function Container({ className, children }: ContainerProps) {
  return (
    <div className={cn('bg-background rounded-lg p-4 w-full min-h-[calc(100vh-240px)] py-5', className)}>
      {children}
    </div>
  )
}
