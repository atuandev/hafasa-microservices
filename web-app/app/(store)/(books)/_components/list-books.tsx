import Image from 'next/image'

import { ListBooksItem } from '@/app/(store)/(books)/_components/list-books-item'
import { ListBooksHeader } from '@/app/(store)/(books)/_components/list-books-header'
import { ListBooksSidebar } from '@/app/(store)/(books)/_components/list-books-sidebar'
import { PaginationWithLinks } from '@/components/ui/pagination-with-links'
import { getPageBooks } from '@/actions/books/books'
import { Skeleton } from '@/components/ui/skeleton'
import { TypographyLarge } from '@/components/typography'

type ListBooksProps = {
  params: { [key: string]: string | string[] | undefined }
}

export async function ListBooks({ params }: ListBooksProps) {
  const pageNo = params.page ? parseInt(params.page as string) : 1
  const pageSize = params.pageSize ? parseInt(params.pageSize as string) : 12
  const sortBy = params.sortBy ? params.sortBy as string : ''
  const search = params.search ? params.search as string : ''
  const categorySlug = params.categorySlug ? params.categorySlug as string : ''

  const { data: pageBooks } = await getPageBooks(pageNo, pageSize, sortBy, search, categorySlug)

  return (
    <div className="space-y-6 h-full">
      <div className="grid grid-cols-12 gap-4 min-h-[64dvh]">
        <div className="col-span-3 bg-sidebar h-full rounded-lg p-4 space-y-4">
          <ListBooksSidebar />
        </div>
        <div className="col-span-9 space-y-4">
          <ListBooksHeader />
          {pageBooks.totalElements > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {pageBooks.items.map((book) => (
                <ListBooksItem book={book} key={book.id} />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center flex-col gap-6">
              <Image
                src="/images/no-result.svg"
                alt="No resutl"
                className="h-[360px] object-cover"
                width={400}
                height={400}
              />
              <TypographyLarge className="text-gray-500">Không tìm thấy sản phẩm nào</TypographyLarge>
            </div>
          )}
        </div>
      </div>

      <PaginationWithLinks
        page={pageNo}
        pageSize={pageSize}
        totalCount={pageBooks.totalElements}
        pageSizeSelectOptions={{ pageSizeOptions: [8, 12, 20] }}
      />
    </div>
  )
}

ListBooks.Skeleton = function ListBooksSkeleton() {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-3 space-y-4">
        <Skeleton className="h-12 w-full rounded-lg" />
        <Skeleton className="h-12 w-full rounded-lg" />
      </div>
      <div className="col-span-9 space-y-4">
        <Skeleton className="h-14 w-full rounded-lg" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Skeleton className="h-[320px] rounded-lg" />
          <Skeleton className="h-[320px] rounded-lg" />
          <Skeleton className="h-[320px] rounded-lg" />
          <Skeleton className="h-[320px] rounded-lg" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Skeleton className="h-[320px] rounded-lg" />
          <Skeleton className="h-[320px] rounded-lg" />
          <Skeleton className="h-[320px] rounded-lg" />
          <Skeleton className="h-[320px] rounded-lg" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Skeleton className="h-[320px] rounded-lg" />
          <Skeleton className="h-[320px] rounded-lg" />
          <Skeleton className="h-[320px] rounded-lg" />
          <Skeleton className="h-[320px] rounded-lg" />
        </div>
      </div>
    </div>
  )
}
