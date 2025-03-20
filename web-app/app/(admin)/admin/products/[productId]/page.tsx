import { FormBook } from '../_components/form-book'
import { getBookById } from '@/actions/books/books'
import { getDiscounts } from '@/actions/books/discounts'

type ProductFormPageProps = {
  params: Promise<{ productId: string }>
}

export default async function ProductFormPage(props: ProductFormPageProps) {
  const params = await props.params
  const product = await getBookById(params.productId)
  const { data: discounts } = await getDiscounts()

  return <FormBook book={product.data} discounts={discounts} />
}
