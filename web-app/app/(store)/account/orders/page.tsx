import { Suspense } from 'react'
import { UserOrders } from '@/app/(store)/account/_components/user-orders'

type OrdersPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function OrdersPage({ searchParams }: OrdersPageProps) {
  const params = await searchParams
  return (
    <Suspense fallback={<UserOrders.Skeleton />}>
      <UserOrders params={params} />
    </Suspense>
  )
}
