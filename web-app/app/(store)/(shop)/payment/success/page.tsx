'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle } from 'lucide-react';
import { useEffect,useState } from 'react';
import { toast } from 'sonner';
import { useCartStore } from '@/stores/cartStore';
import { Button } from '@/components/ui/button';
import { TypographyH2, TypographyLarge } from '@/components/typography';
import { createOrder, getOrderById } from '@/actions/orders/order';
import { OrderStatus } from '@/types/order';

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const { removeItem } = useCartStore(); // ✅ Thêm dòng này
  const [orderId, setOrderId] = useState<string | null>(null)

useEffect(() => {
  const createPendingOrder = async () => {
    const storedOrder = sessionStorage.getItem('pendingOrderData')
    if (!storedOrder) {
      toast.error('Không tìm thấy thông tin đơn hàng tạm thời')
      return
    }

    const orderData = JSON.parse(storedOrder)

    try {
      const response = await createOrder(orderData)
          if (response) {
    setOrderId(response?.data.id);
  }
      if (response.code !== 1000) {
        toast.error('Không thể tạo đơn hàng thành công')
        console.error('Failed to create order:', response.message)
      } else {
        toast.success('Tạo đơn hàng thành công')

          // ✅ XÓA GIỎ HÀNG Ở ĐÂY
  orderData.orderDetails.forEach((item: any) => {
    removeItem(item.bookId);
  });

        // Xóa dữ liệu sau khi đã tạo đơn hàng thành công
        sessionStorage.removeItem('pendingOrderData')
      }
    } catch (error) {
      toast.error('Đã xảy ra lỗi khi tạo đơn hàng')
      console.error('Error creating order:', error)
    }
  }

  createPendingOrder()
}, [])


  return (
    <div className="container py-10">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-sm flex flex-col items-center">
        <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
        <TypographyH2 className="text-center mb-2">Thanh toán thành công</TypographyH2>
        <TypographyLarge className="text-center text-muted-foreground mb-6">
          Đơn hàng của bạn đã được xác nhận thanh toán.
          {orderId && <div className="mt-2">Mã đơn hàng: {orderId}</div>}
        </TypographyLarge>
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <Button asChild variant="outline" className="flex-1">
            <Link href="/account/orders">Xem đơn hàng</Link>
          </Button>
          <Button asChild className="flex-1">
            <Link href="/">Tiếp tục mua sắm</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}