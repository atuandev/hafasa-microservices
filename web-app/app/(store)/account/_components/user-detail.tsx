import FormUser from '@/app/(store)/account/_components/form-user'
import { getUserInfo } from '@/actions/users/info'
import { Skeleton } from '@/components/ui/skeleton'
import { TypographyLarge, TypographyMuted } from '@/components/typography'
import { Avatar, AvatarImage } from '@/components/ui/avatar'

export async function UserDetail() {
  const user = await getUserInfo()

  return (
    <div className="space-y-4">
      <div className="flex items-center bg-sidebar gap-4 rounded-lg p-4">
        <Avatar className="size-16">
          <AvatarImage src={user.avatar || '/images/default-avatar.svg'} />
        </Avatar>
        <div>
          <TypographyLarge className="text-xl">{user.name}</TypographyLarge>
          <TypographyMuted className="text-lg">@{user.username}</TypographyMuted>
        </div>
      </div>
      <div className="space-y-6 bg-sidebar rounded-lg p-4">
        <TypographyLarge>Thông tin cá nhân</TypographyLarge>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <FormUser user={user} />
        </div>
      </div>
    </div>
  )
}

UserDetail.Skeleton = function UserDetailSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-20 w-full rounded-lg" />
      <Skeleton className="h-80 w-full rounded-lg" />
    </div>
  )
}