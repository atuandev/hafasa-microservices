import { TypographyH3 } from '@/components/typography'
import { CartList } from './_components/cart-list'

export default async function CartPage() {
  return (
    <div className='space-y-6'>
      <TypographyH3 className="uppercase">giỏ hàng</TypographyH3>
      <CartList  />
    </div>
  )
}
