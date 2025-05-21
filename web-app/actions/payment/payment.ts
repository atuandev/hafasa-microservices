'use server'

import http from '@/lib/http'
// import { OrderResponse } from '@/types/order'
import { PaymentResponse } from '@/types/payment'
import { PaymentSchemaType } from '@/schemas/payment'

export const createPaymentLink = async (data: PaymentSchemaType) => {
  const { payload } = await http.post<PaymentResponse>('/payment-service/create-payment-link', JSON.stringify(data))
  return payload
}

export const getPaymentInfoById = async (orderCode: number) => {
  const { payload } = await http.get<PaymentResponse>(`/payment-service/${orderCode}`)
  return payload
}

// New function to handle PayOS payment cancellation
export const cancelPayment = async (orderCode: string) => {
  const { payload } = await http.post<PaymentResponse>(
    `/payment-service/cancel-payment-link`,
    JSON.stringify({ orderCode })
  )
  return payload
}
