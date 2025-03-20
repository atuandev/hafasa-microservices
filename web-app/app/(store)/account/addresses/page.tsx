import { Suspense } from 'react'
import UserAddresses from '@/app/(store)/account/_components/user-addresses'

type AddressesPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function AddressesPage( { searchParams }: AddressesPageProps) {
  const params = await searchParams
  return (
    <Suspense fallback={<UserAddresses.Skeleton />}>
      <UserAddresses params={params} />
    </Suspense>
  )
}
