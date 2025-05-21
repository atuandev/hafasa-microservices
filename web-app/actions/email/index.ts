'use server'

import http from '@/lib/http'

export type OrderDetailDTO = {
  bookId: string
  bookTitle: string
  bookThumbnail: string
  quantity: number
  price: number
}

export type OrderEmailRequest = {
  orderId: string
  userId: string
  receiverName: string
  receiverEmail: string
  receiverPhone: string
  address: string
  paymentMethod: string
  total: number
  orderDetails: OrderDetailDTO[]
}

export const sendOrderConfirmationEmail = async (data: OrderEmailRequest) => {
  try {
    const { payload } = await http.post('/email-service/email/order-confirmation', JSON.stringify(data))
    return payload
  } catch (error) {
    console.error('Error sending order confirmation email:', error)
    return { code: 5000, message: 'Failed to send order confirmation email' }
  }
}