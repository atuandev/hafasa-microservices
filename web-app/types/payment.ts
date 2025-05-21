import { Order } from '@/types/order'

export type Payment = {
  orderCode: number
  // orderId: string
  price: number
  checkoutUrl: string
  returnUrl: string
  cancelUrl: string
  status: PaymentStatus
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  CANCELLED = 'CANCELLED',
}

export type PaymentResponse = {
  code: number
  message?: string
  data: Payment
}
