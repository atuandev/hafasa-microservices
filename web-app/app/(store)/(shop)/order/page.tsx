import { TypographyH3 } from '@/components/typography'
import FormOrder from './_components/form-order'
import { getUserAddresses } from '@/actions/users/address'

export default async function OrderPage() {
  const { user, addresses } = await getUserAddresses()

  return (
    <div className='space-y-6'>
      <TypographyH3 className="uppercase">Thanh toán</TypographyH3>
      <FormOrder user={user} addresses={addresses} />
    </div>
  )
}
