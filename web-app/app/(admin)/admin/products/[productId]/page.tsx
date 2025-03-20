import http from '@/lib/http'
import { PageDiscountsResponse } from '@/types/discount'
import { FormBook } from '../_components/form-book'
import { getBookById } from '@/actions/books/books'

type ProductFormPageProps = {
  params: Promise<{ productId: string }>
}

export default async function ProductFormPage(props: ProductFormPageProps) {
  const params = await props.params
  const product = await getBookById(params.productId)
  const discounts = await http.get<PageDiscountsResponse>('/discounts')

  return <FormBook book={product.data} discounts={discounts.payload.data} />
}
