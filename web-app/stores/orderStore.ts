import { create } from 'zustand'
import { Book } from '@/types/book'

type OrderDetail = {
  book: Book
  quantity: number
  price: number
}

type OrderStore = {
  total: number
  orderDetails: OrderDetail[]

  setTotal: (total: number) => void
  setOrderDetails: (orderDetails: OrderDetail[]) => void
}

export const useOrderStore = create<OrderStore>(set => ({
  total: 0,
  orderDetails: [],
  setTotal: total => set({ total }),
  setOrderDetails: orderDetails => set({ orderDetails }),
}))
