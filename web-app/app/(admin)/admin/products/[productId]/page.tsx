import { FormBook } from '../_components/form-book'
import { getBookById } from '@/actions/books/books'
import { getPageCategories } from '@/actions/books/categories'
import { getPageDiscounts } from '@/actions/books/discounts'
import { getPagePublishers } from '@/actions/books/publishers'

type ProductFormPageProps = {
  params: Promise<{ productId: string }>
}

export default async function ProductFormPage(props: ProductFormPageProps) {
  const params = await props.params
  const product = await getBookById(params.productId)
  const { data: discounts } = await getPageDiscounts({ pageNo: 1, pageSize: 100, sortBy: 'name:asc', search: '' })
  const { data: publishers } = await getPagePublishers({ pageNo: 1, pageSize: 100, sortBy: 'name:asc', search: '' })
  const { data: categories } = await getPageCategories({ pageNo: 1, pageSize: 100, sortBy: 'name:asc', search: '' })

  return <FormBook book={product.data} discounts={discounts} publishers={publishers} categories={categories} />
}
