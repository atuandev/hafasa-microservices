import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { TypographyH3 } from '@/components/typography'
import { PageBooks } from '@/types/book'
import { Skeleton } from '@/components/ui/skeleton'
import { ListBooksTable } from './list-books-table'
import { ListBookFilter } from './list-books-filter'

interface ListBooksProps {
  booksData: PageBooks
}

export default function ListBooks({ booksData }: ListBooksProps) {
  return (
    <div className='space-y-6'>
      <div className='mb-6 flex items-center justify-between'>
        <TypographyH3 className='text-primary'>Danh sách sản phẩm</TypographyH3>

        <Link href='/admin/products/add'>
          <Button type='button'>Thêm sách</Button>
        </Link>
      </div>

      <ListBookFilter />
      <ListBooksTable books={booksData} />
    </div>
  )
}

ListBooks.Skeleton = function ListBooksSkeleton() {
  return (
    <div className='flex flex-col gap-2'>
      <Skeleton className='h-16 w-full' />
    </div>
  )
}
