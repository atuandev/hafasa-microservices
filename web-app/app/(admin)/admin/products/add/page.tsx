import { getPageCategories } from '@/actions/books/categories'
import { getPageDiscounts } from '@/actions/books/discounts'
import { getPagePublishers } from '@/actions/books/publishers'
import { FormBook } from '@/app/(admin)/admin/products/_components/form-book'
import { TypographyH4 } from '@/components/typography'

export default async function AddProductPage() {
  const { data: discounts } = await getPageDiscounts({ pageNo: 1, pageSize: 100, sortBy: 'name:asc', search: '' })
  const { data: publishers } = await getPagePublishers({ pageNo: 1, pageSize: 100, sortBy: 'name:asc', search: '' })
  const { data: categories } = await getPageCategories({ pageNo: 1, pageSize: 100, sortBy: 'name:asc', search: '' })

  return (
    <>
      <TypographyH4 className='mb-6 text-primary'>Thêm sách mới</TypographyH4>
      <FormBook discounts={discounts} publishers={publishers} categories={categories} />
    </>
  )
}
