import { Skeleton } from '@/components/ui/skeleton'
import FormUpdatePassword from '@/app/(store)/account/_components/form-update-password'
import { TypographyH4 } from '@/components/typography'

export function UserPassword() {
  return (
    <div className="flex flex-col gap-4">
      <TypographyH4 className="text-center">Cập nhật mật khẩu</TypographyH4>
      <div className="bg-sidebar gap-4 rounded-lg p-4">
        <FormUpdatePassword />
      </div>
    </div>
  )
}

UserPassword.Skeleton = function UserPasswordSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-20 w-full rounded-lg" />
      <Skeleton className="h-80 w-full rounded-lg" />
    </div>
  )
}