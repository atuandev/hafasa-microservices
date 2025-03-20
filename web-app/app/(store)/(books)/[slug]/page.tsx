import { BookDetail } from '@/app/(store)/(books)/_components/book-detail'
import { getBookBySlug } from '@/actions/books/books'

type BookDetailProps = {
  params: Promise<{ slug: string }>
}

export default async function BookDetailPage(props: BookDetailProps) {
  const params = await props.params;
  const book = await getBookBySlug(params.slug)

  return <BookDetail book={book.data} />
}