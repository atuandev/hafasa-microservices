import { TypographyH3 } from '@/components/typography'
import { Skeleton } from '@/components/ui/skeleton'
import { OrdersTable } from './orders-table'
import { OrdersFilter } from './orders-filter'
import { PageOrdersResponse } from '@/types/order'

interface ListOrdersProps {
  ordersData: PageOrdersResponse['data']
}

export default function ListOrders({ ordersData }: ListOrdersProps) {
  return (
    <div className='space-y-6'>
      <div className='mb-6 flex items-center justify-between'>
        <TypographyH3 className='text-primary'>Danh sách đơn hàng</TypographyH3>
      </div>

      <OrdersFilter />
      <OrdersTable orders={ordersData} />
    </div>
  )
}

ListOrders.Skeleton = function ListOrdersSkeleton() {
  return (
    <div className='flex flex-col gap-2'>
      <Skeleton className='h-16 w-full' />
      <Skeleton className='h-96 w-full' />
    </div>
  )
}