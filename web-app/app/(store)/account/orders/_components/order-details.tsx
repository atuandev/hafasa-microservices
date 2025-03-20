import Link from 'next/link'
import Image from 'next/image'

import { formatDateTime, formatVND } from '@/utils/format'
import { TypographyH4, TypographyLarge, TypographyMuted, TypographySmall } from '@/components/typography'
import { getOrderById } from '@/actions/orders/order'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'

type OrderDetailProps = {
  orderId: string
}

export async function OrderDetails({ orderId }: OrderDetailProps) {
  const { data: order } = await getOrderById(orderId)

  return (
    <div className='rounded-md p-4 space-y-6'>
      <TypographyH4>Thông tin đơn hàng</TypographyH4>
      <div className='space-y-2'>
        <div className='flex items-center gap-2'>
          <TypographyMuted>Mã đơn hàng:</TypographyMuted>
          <Badge variant='secondary'>{order.id}</Badge>
        </div>
        <TypographyMuted>
          Ngày đặt hàng: <TypographySmall>{formatDateTime(order.createdAt)}</TypographySmall>
        </TypographyMuted>
        <TypographyMuted>
          Người nhận: <TypographySmall>{order.receiverName}</TypographySmall>
        </TypographyMuted>
        <TypographyMuted>
          Số điện thoại: <TypographySmall>{order.receiverPhone}</TypographySmall>
        </TypographyMuted>
        <TypographyMuted>
          Địa chỉ: <TypographySmall>{order.address}</TypographySmall>
        </TypographyMuted>
        <TypographyMuted>
          Phương thức thanh toán: <TypographySmall>{order.paymentMethod}</TypographySmall>
        </TypographyMuted>
      </div>
      <div>
        <div className='grid grid-cols-12 gap-2 items-center p-2 bg-sidebar'>
          <TypographySmall className='col-span-6'>Sản phẩm</TypographySmall>
          <TypographySmall className='col-span-2 text-right'>Đơn giá</TypographySmall>
          <TypographySmall className='col-span-2 text-right'>Số lượng</TypographySmall>
          <TypographySmall className='col-span-2 text-right'>Thành tiền</TypographySmall>
        </div>
        <div className='divide-y'>
          {order.orderDetails.map(item => (
            <div key={item.slug} className='grid grid-cols-12 gap-2 items-center py-2'>
              <Link href={`/${item.slug}`} target='_blank' className='col-span-6 flex gap-4 items-center'>
                <Image
                  src={item.thumbnail}
                  alt={item.bookTitle}
                  className='w-24 object-cover'
                  width={500}
                  height={500}
                />
                <TypographySmall>{item.bookTitle}</TypographySmall>
              </Link>
              <div className='col-span-2 text-right'>
                <TypographySmall className=''>{formatVND(item.price)}</TypographySmall>
              </div>
              <div className='col-span-2 text-right'>
                <TypographySmall className=''>{item.quantity}</TypographySmall>
              </div>
              <div className='col-span-2 text-right'>
                <TypographyLarge className='text-rose-500'>{formatVND(item.price * item.quantity)}</TypographyLarge>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='flex items-center justify-end gap-4 bg-sidebar px-4 py-2 rounded-md'>
        <TypographyLarge>Tổng tiền:</TypographyLarge>
        <TypographyH4 className='text-primary font-semibold'>{formatVND(order.total)}</TypographyH4>
      </div>
    </div>
  )
}

OrderDetails.Skeleton = function OrderDetailsSkeleton() {
  return (
    <div className='space-y-4'>
      <Skeleton className='h-16 w-full rounded-lg' />
      <div className='space-y-2'>
        <Skeleton className='h-8 w-[400px] rounded-lg' />
        <Skeleton className='h-8 w-[400px] rounded-lg' />
        <Skeleton className='h-8 w-[400px] rounded-lg' />
        <Skeleton className='h-8 w-[400px] rounded-lg' />
        <Skeleton className='h-8 w-[400px] rounded-lg' />
      </div>
      <div className='space-y-2 mt-4'>
        <Skeleton className='h-14 w-full rounded-lg' />
        <Skeleton className='h-14 w-full rounded-lg' />
        <Skeleton className='h-14 w-full rounded-lg' />
        <Skeleton className='h-14 w-full rounded-lg' />
        <Skeleton className='h-14 w-full rounded-lg' />
      </div>
    </div>
  )
}
