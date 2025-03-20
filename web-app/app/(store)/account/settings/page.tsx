import { TypographyH4, TypographyP } from '@/components/typography'
import { ModeToggle } from '@/components/ui/mode-toggle'

export default function SettingsPage() {
  return (
    <div className="space-y-4">
      <TypographyH4 className="mb-4 text-center">Cài đặt</TypographyH4>
      <div className="flex items-center gap-4 rounded-md p-4">
        <TypographyP>Giao diện:</TypographyP>
        <ModeToggle />
      </div>
    </div>
  )
}
