import { Suspense } from 'react'
import { SearchParams } from 'nuqs/server'
import { loadSearchParams } from './_components/search/searchParams'
import { getBooksBySpecification } from '@/actions/books/books'
import ListBooks from './_components/list-books'

type ProductsPageProps = {
  searchParams: Promise<SearchParams>
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { page, pageSize, sortBy, books } = await loadSearchParams(searchParams)
  const { data: booksData } = await getBooksBySpecification({ pageNo: page, pageSize, sortBy, books })

  return (
    <Suspense fallback={<ListBooks.Skeleton />}>
      <ListBooks booksData={booksData} />
    </Suspense>
  )
}
