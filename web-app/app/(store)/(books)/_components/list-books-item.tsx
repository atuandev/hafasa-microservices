import Image from 'next/image'
import { TypographyLarge, TypographyMuted, TypographySmall } from '@/components/typography'
import { formatVND } from '@/utils/format'
import { Book } from '@/types/book'
import Link from 'next/link'

type ListBooksItemProps = {
  book: Book
}

export function ListBooksItem({ book }: ListBooksItemProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-lg h-full">
      <Link href={`/${book.slug}`} className="cursor-pointer">
        <Image
          src={book.thumbnail}
          alt={book.title}
          className="h-[200px] object-cover rounded-t-lg mb-2"
          width={500}
          height={500}
        />
        <TypographySmall>{book.title}</TypographySmall>
      </Link>
      <div className="flex items-center gap-4 mt-auto">
        <TypographyLarge className="text-rose-500">{formatVND(book.discountPrice)}</TypographyLarge>
        <div className="px-2 bg-rose-500 shadow-sm rounded-sm">
          <TypographySmall className="text-rose-50">{book.discountPrice !== book.price && `-${book.discount.percent}%`}</TypographySmall>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <TypographyMuted
          className="line-through">{book.discountPrice !== book.price && formatVND(book.price)}
        </TypographyMuted>
      </div>
    </div>
  )
}
