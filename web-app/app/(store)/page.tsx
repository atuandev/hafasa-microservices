import { Suspense } from 'react'
import { Container } from '@/components/common/container'
import { ListBooks } from '@/app/(store)/(books)/_components/list-books'

type BooksPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Home({ searchParams }: BooksPageProps) {
  const params = await searchParams

  return (
    <Container className="bg-white dark:bg-gray-900">
      <Suspense fallback={<ListBooks.Skeleton />}>
        <ListBooks params={params} />
      </Suspense>
    </Container>
  )
}
