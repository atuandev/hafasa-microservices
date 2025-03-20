import { Suspense } from 'react'
import { UserPassword } from '@/app/(store)/account/_components/user-password'

export default async function OrdersPage() {
  return (
    <Suspense fallback={<UserPassword.Skeleton />}>
      <UserPassword />
    </Suspense>
  )
}
