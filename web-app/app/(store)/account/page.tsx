import { Suspense } from 'react'
import { UserDetail } from '@/app/(store)/account/_components/user-detail'

export default async function AccountPage() {
  return (
    <Suspense fallback={<UserDetail.Skeleton />}>
      <UserDetail />
    </Suspense>
  )
}
