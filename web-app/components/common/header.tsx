import { UserMenu } from '@/components/common/user-menu'
import { Logo } from '@/components/common/logo'
import { AuthMenu } from '@/components/common/auth-menu'
import { HeaderCart } from '@/components/common/header-cart'
import { Skeleton } from '@/components/ui/skeleton'
import { getUserInfo } from '@/actions/users/info'

const Header = async () => {
  const user = await getUserInfo()

  return (
    <header className="w-full bg-background backdrop-blur-[10px] shadow-sm saturate-100 z-40">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-4 md:px-8 py-4">
        <Logo />
        <div className="flex items-center justify-center gap-4">
          <HeaderCart />
          {user ? (
            <UserMenu user={user} />
          ) : (
            <AuthMenu />
          )}
        </div>
      </div>
    </header>
  )
}

Header.Skeleton = function HeaderSkeleton() {
  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl px-4 md:px-8 py-4">
        <Skeleton className="h-[44px] w-[240px]" />
        <div className="flex items-center justify-center gap-4">
          <Skeleton className="h-[44px] w-[56px]" />
          <Skeleton className="h-[44px] w-[56px]" />
        </div>
      </div>
    </div>
  )
}

export { Header }