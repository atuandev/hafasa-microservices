'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { TypographyH2, TypographyLarge } from '@/components/typography';
import { getOrderById } from '@/actions/orders/order';
import { cancelPayment } from '@/actions/payment/payment';

export default function PaymentCancelPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [isUpdating, setIsUpdating] = useState(true);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    // Only run in the browser environment
    if (typeof window === 'undefined' || !orderId) return;

    const processCancellation = async () => {
      try {
        console.log(`Processing payment cancellation for order: ${orderId}`);
        
        // First, get the order details just to check its current state
        const orderDetails = await getOrderById(orderId);
        console.log('Current order details:', orderDetails);
        
        // Use our dedicated server action for cancelling payments
        const response = await cancelPayment(orderId);
        console.log('Cancel payment response:', response);
        
        // if (response.code === 1000) {
        //   setUpdateSuccess(true);
        //   console.log('Payment cancelled successfully');
        // } else {
        //   toast.error('Không thể hủy thanh toán');
        //   console.error('Failed to cancel payment:', response.message);
        // }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        toast.error('Đã xảy ra lỗi khi hủy thanh toán');
        console.error('Error cancelling payment:', errorMessage);
      } finally {
        setIsUpdating(false);
      }
    };

    processCancellation();
  }, [orderId]);

  return (
    <div className="container py-10">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-sm flex flex-col items-center">
        <XCircle className="w-16 h-16 text-red-500 mb-4" />
        <TypographyH2 className="text-center mb-2">Thanh toán thất bại</TypographyH2>
        <TypographyLarge className="text-center text-muted-foreground mb-6">
          Đơn hàng của bạn chưa được thanh toán.
          {orderId && <div className="mt-2">Mã đơn hàng: {orderId}</div>}
          {updateSuccess && <div className="mt-2 text-red-500">Đơn hàng đã được hủy.</div>}
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