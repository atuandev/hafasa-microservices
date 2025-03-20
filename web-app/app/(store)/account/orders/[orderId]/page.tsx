import { Suspense } from 'react'
import { OrderDetails } from '@/app/(store)/account/orders/_components/order-details'

type OrderDetailProps = {
  params: Promise<{ orderId: string }>
}

export default async function OrderDetailPage(props: OrderDetailProps) {
  const { orderId } = await props.params

  return (
    <Suspense fallback={<OrderDetails.Skeleton />}>
      <OrderDetails orderId={orderId} />
    </Suspense>
  )
}