import http from '@/lib/http'
import { TypographyH4 } from '@/components/typography'
import { PageDiscountsResponse } from '@/types/discount'
import { FormBook } from '@/app/(admin)/admin/products/_components/form-book'

export default async function AddProductPage() {
  const discounts = await http.get<PageDiscountsResponse>('/discounts')

  return (
    <>
      <TypographyH4 className='mb-6 text-primary'>Thêm sách mới</TypographyH4>
      <FormBook discounts={discounts.payload.data} />
    </>
  )
}
