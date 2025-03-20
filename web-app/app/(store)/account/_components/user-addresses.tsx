import { getUserAddresses } from '@/actions/users/address'
import { Skeleton } from '@/components/ui/skeleton'
import { TypographyH4 } from '@/components/typography'
import FormUserAddresses from '@/app/(store)/account/_components/form-user-addresses'
import ListAddresses from '@/app/(store)/account/_components/list-addresses'

type ListAddressesProps = {
  params: { [key: string]: string | string[] | undefined }
}

export default async function UserAddresses({ params }: ListAddressesProps) {
  const { addresses, user } = await getUserAddresses()

  return (
    <div className="space-y-4">
      <FormUserAddresses user={user} />
      <div className="flex flex-col gap-4 rounded-lg p-4">
        <TypographyH4 className="text-center">Địa chỉ của bạn</TypographyH4>
        <ListAddresses addresses={addresses} params={params} />
      </div>
    </div>
  )
}

UserAddresses.Skeleton = function UserAddressesSkeleton() {
  return (
    <div className="space-y-2">
        <Skeleton className="h-14 w-full rounded-lg" />
        <Skeleton className="h-14 w-full rounded-lg" />
        <Skeleton className="h-14 w-full rounded-lg" />
        <Skeleton className="h-14 w-full rounded-lg" />
    </div>
  )
}
