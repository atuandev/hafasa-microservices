'use server'

import http from '@/lib/http'
import { OrderResponse } from '@/types/order'
import { PaymentResponse } from '@/types/payment'
import { PaymentSchemaType } from '@/schemas/payment'

export const createPaymentLink = async (data: PaymentSchemaType) => {
  const { payload } = await http.post<PaymentResponse>('/payment-service/create-payment-link', JSON.stringify(data))
  return payload
}

// New function to handle PayOS payment cancellation
export const cancelPayment = async (orderId: string) => {
  try {
    console.log(`Cancelling payment for order: ${orderId}`)

    // Send a direct request to update order status to CANCELLED
    const { payload } = await http.patch<OrderResponse>(
      `/order-service/orders/${orderId}/status`,
      JSON.stringify({ status: 'CANCELLED' })
    )

    console.log('Cancel payment response:', payload)
    return payload
  } catch (error) {
    console.error('Error in cancelPayment server action:', error)
    return {
      code: 0,
      message: 'Failed to cancel payment',
      data: null,
    }
  }
}
