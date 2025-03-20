import { TooltipProvider } from '@/components/ui/tooltip'
import { ThemeProvider } from 'next-themes'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

type ProvidersProps = {
  children: React.ReactNode
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      enableColorScheme
      disableTransitionOnChange
    >
      <NuqsAdapter>
        <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
      </NuqsAdapter>
    </ThemeProvider>
  )
}
