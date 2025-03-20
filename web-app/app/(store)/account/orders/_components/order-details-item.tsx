import Link from 'next/link'
import Image from 'next/image'

import { TypographyLarge, TypographySmall } from '@/components/typography'
import { formatVND } from '@/utils/format'
import { getBookById } from '@/actions/books/books'

type OrderDetailsItemProps = {
  bookId: string
  price: number
  quantity: number
}

export async function OrderDetailsItem({ bookId, price, quantity }: OrderDetailsItemProps) {
  const { data: book } = await getBookById(bookId)

  return (
    <div className='grid grid-cols-12 gap-2 items-center py-2'>
      <Link href={`/${book.slug}`} target='_blank' className='col-span-6 flex gap-4 items-center'>
        <Image 
        src={book.thumbnail} 
        alt={book.title} 
        className='w-24 object-cover' 
        width={500} 
        height={500} 
        />
        <TypographySmall>{book.title}</TypographySmall>
      </Link>
      <div className='col-span-2 text-right'>
        <TypographySmall>{formatVND(price)}</TypographySmall>
      </div>
      <div className='col-span-2 text-right'>
        <TypographySmall>{quantity}</TypographySmall>
      </div>
      <div className='col-span-2 text-right'>
        <TypographyLarge className='text-rose-500'>{formatVND(price * quantity)}</TypographyLarge>
      </div>
    </div>
  )
}
