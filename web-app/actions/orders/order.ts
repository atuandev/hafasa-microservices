'use server'

import http from '@/lib/http'
import { getUserInfo } from '@/actions/users/info'
import { OrderResponse, PageOrdersResponse } from '@/types/order'
import { OrderSchemaType } from '@/schemas/order'

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
  const { payload } = await http.post<OrderResponse>('/order-service/orders', JSON.stringify(data))
  return payload
}
