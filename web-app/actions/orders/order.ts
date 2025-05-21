'use server'

import http from '@/lib/http'
import { getUserInfo } from '@/actions/users/info'
import { OrderResponse, PageOrdersResponse, OrderStatus } from '@/types/order'
import { OrderSchemaType } from '@/schemas/order'
import { sendOrderConfirmationEmail, OrderEmailRequest, OrderDetailDTO } from '@/actions/email'
import { PageBooksResponse } from '@/types/book'
import { getBookById } from '@/actions/books/books'

export const getUserOrders = async (pageNo: number, pageSize: number) => {
  const user = await getUserInfo()
  const { payload } = await http.get<PageOrdersResponse>(
    `/order-service/orders/list/user/${user.id}?pageNo=${pageNo}&pageSize=${pageSize}`
  )
  return payload
}

export const getOrderById = async (orderId: string) => {
  const { payload } = await http.get<OrderResponse>(`/order-service/orders/${orderId}`)
  return payload
}

export const createOrder = async (data: OrderSchemaType) => {
  // Create the order first
  const { payload } = await http.post<OrderResponse>('/order-service/orders', JSON.stringify(data))
  
  if (payload.code === 1000 && payload.data) {
    try {
      // Get user info to access email
      const user = await getUserInfo()
      
      // Track which books we've successfully looked up
      const successfulLookups = new Map<string, { title: string, thumbnail?: string }>();
      
      // We need to get book details for each order item
      const orderDetailsPromises = data.orderDetails.map(async (detail) => {
        try {
          // First attempt: Try to get the book directly by ID
          const bookResponse = await getBookById(detail.bookId).catch(() => null);
          
          if (bookResponse?.code === 1000 && bookResponse?.data) {
            successfulLookups.set(detail.bookId, bookResponse.data);
            return {
              bookId: detail.bookId,
              bookTitle: bookResponse.data.title,
              bookThumbnail: bookResponse.data.thumbnail || '',
              quantity: detail.quantity,
              price: detail.price
            } as OrderDetailDTO;
          }
          
          // Second attempt: Try to find the book in the list endpoint
          const { payload: listPayload } = await http.get<PageBooksResponse>(
            `/product-service/books/list?pageNo=1&pageSize=10`
          );
          
          const bookFromList = listPayload?.data?.items?.find(
            item => item.id === detail.bookId
          );
          
          if (bookFromList) {
            successfulLookups.set(detail.bookId, bookFromList);
            return {
              bookId: detail.bookId,
              bookTitle: bookFromList.title,
              bookThumbnail: bookFromList.thumbnail || '',
              quantity: detail.quantity,
              price: detail.price
            } as OrderDetailDTO;
          }
          
          // If we still haven't found the book, log the issue and return a fallback
          console.error(`Could not find book with ID ${detail.bookId} using any method`);
          return {
            bookId: detail.bookId,
            bookTitle: 'Unknown Book',
            bookThumbnail: '',
            quantity: detail.quantity,
            price: detail.price
          } as OrderDetailDTO;
        } catch (error) {
          console.error(`Error fetching book details for ${detail.bookId}:`, error)
          return {
            bookId: detail.bookId,
            bookTitle: 'Unknown Book',
            bookThumbnail: '',
            quantity: detail.quantity,
            price: detail.price
          } as OrderDetailDTO;
        }
      })
      
      // Wait for all book details to be fetched
      const orderDetails = await Promise.all(orderDetailsPromises)
      
      // Log diagnostic info about the book lookups
      console.log(`Successfully looked up ${successfulLookups.size}/${data.orderDetails.length} books`);
      
      // Prepare email request with the proper structure
      const emailRequest: OrderEmailRequest = {
        orderId: payload.data.id,
        userId: data.userId,
        receiverName: data.receiverName,
        receiverEmail: user.email,
        receiverPhone: data.receiverPhone,
        address: data.address,
        paymentMethod: data.paymentMethod,
        total: data.total,
        orderDetails: orderDetails
      }
      
      // Send order confirmation email
      await sendOrderConfirmationEmail(emailRequest)
    } catch (error) {
      console.error('Failed to send order confirmation email:', error)
      // Don't throw error here; we want the order creation to succeed even if email sending fails
    }
  }
  
  return payload
}

export const changeStatus = async (orderId: string, status: OrderStatus) => {
  const { payload } = await http.patch<OrderResponse>(
    `/order-service/orders/${orderId}/status`,
    JSON.stringify({ status })
  )
  return payload
}

export const getAllOrders = async (pageNo: number, pageSize: number, sortBy: string) => {
  const { payload } = await http.get<PageOrdersResponse>(
    `/order-service/orders?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}`
  )
  return payload
}
