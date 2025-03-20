import Link from 'next/link'
import { Eye } from 'lucide-react'

import { getUserOrders } from '@/actions/orders/order'
import { formatDateTime, formatVND } from '@/utils/format'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { TypographyH4 } from '@/components/typography'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { PaginationWithLinks } from '@/components/ui/pagination-with-links'

type UserOrdersProps = {
  params: { [key: string]: string | string[] | undefined }
}

export async function UserOrders({ params }: UserOrdersProps) {
  const pageNo = params.page ? parseInt(params.page as string) : 1
  const pageSize = params.pageSize ? parseInt(params.pageSize as string) : 6

  const { data: orders } = await getUserOrders(pageNo, pageSize)

  return (
    <div className='space-y-4'>
      <TypographyH4 className='text-center mb-4'>Đơn hàng của bạn</TypographyH4>

      <Table>
        <TableHeader className='bg-sidebar'>
          <TableRow>
            <TableHead className='w-[5%] text-center'>#</TableHead>
            <TableHead className='w-[15%]'>Tên người nhận</TableHead>
            <TableHead className='w-[15%]'>Thời gian</TableHead>
            <TableHead className='w-[30%] hidden md:flex md:justify-center md:items-center'>Địa chỉ</TableHead>
            <TableHead className='w-[15%] text-right'>Tổng tiền</TableHead>
            <TableHead className='w-[15%] text-center'>Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.items.map((order, index) => (
            <TableRow key={order.id}>
              <TableCell className='w-[5%] text-center'>{index + 1}</TableCell>
              <TableCell className='w-[15%]'>{order.receiverName}</TableCell>
              <TableCell className='w-[15%]'>{formatDateTime(order.createdAt)}</TableCell>
              <TableCell className='w-[35%] hidden md:flex md:justify-center md:items-center'>
                {order.address}
              </TableCell>
              <TableCell className='w-[15%] text-right text-primary font-semibold'>{formatVND(order.total)}</TableCell>
              <TableCell className='w-[15%] text-center'>
                <div className='w-full flex items-center justify-center'>
                  <Link href={`/account/orders/${order.id}`}>
                    <Button variant='gray' size='iconSmall'>
                      <Eye size={16} />
                    </Button>
                  </Link>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <PaginationWithLinks
        page={pageNo}
        pageSize={pageSize}
        totalCount={orders.totalElements}
        pageSizeSelectOptions={{ pageSizeOptions: [6, 12, 20] }}
      />
    </div>
  )
}

UserOrders.Skeleton = function UserOrdersSkeleton() {
  return (
    <div className='space-y-2'>
      <Skeleton className='h-14 w-full rounded-lg' />
      <Skeleton className='h-14 w-full rounded-lg' />
      <Skeleton className='h-14 w-full rounded-lg' />
      <Skeleton className='h-14 w-full rounded-lg' />
    </div>
  )
}
