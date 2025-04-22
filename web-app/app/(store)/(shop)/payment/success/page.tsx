'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle } from 'lucide-react';
import { useEffect } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { TypographyH2, TypographyLarge } from '@/components/typography';
import { createOrder, getOrderById } from '@/actions/orders/order';
import { OrderStatus } from '@/types/order';

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  useEffect(() => {
    // When the component mounts and there's an orderId, create a pending order
    if (orderId) {
      const createPendingOrder = async () => {
        try {
          // Get the original order details
          const orderDetails = await getOrderById(orderId);
          
          if (orderDetails.code !== 1000) {
            toast.error('Không thể lấy thông tin đơn hàng');
            console.error('Failed to get order details:', orderDetails.message);
            return;
          }
          
          // Create a new order with PENDING status using the existing createOrder function
          const { data } = orderDetails;
          const pendingOrderData = {
            userId: data.userId,
            receiverName: data.receiverName,
            receiverPhone: data.receiverPhone,
            address: data.address,
            paymentMethod: data.paymentMethod,
            total: data.total,
            orderStatus: OrderStatus.PENDING,
            orderDetails: data.orderDetails.map(item => ({
              bookId: item.bookId,
              quantity: item.quantity,
              price: item.price
            }))
          };
          
          // Use the existing createOrder function to create a pending order
          const response = await createOrder(pendingOrderData);
          
          if (response.code !== 1000) {
            toast.error('Không thể tạo đơn hàng thành công');
            console.error('Failed to create pending order:', response.message);
          } else {
            console.log('Pending order created successfully');
          }
        } catch (error) {
          toast.error('Đã xảy ra lỗi khi tạo đơn hàng');
          console.error('Error creating pending order:', error);
        }
      };

      createPendingOrder();
    }
  }, [orderId]);

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