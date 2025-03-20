export type OrderDetailRequest = {
  bookId: string
  quantity: number
  price: number
}

export type OrderDetail = {
  bookId: string
  quantity: number
  price: number
}

export enum PaymentMethod {
  COD = 'COD',
  PAYOS = 'PAYOS'
}

export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  SHIPPING = 'SHIPPING',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

export type Order = {
  id: string
  receiverName: string
  receiverPhone: string
  address: string
  paymentMethod: PaymentMethod
  orderStatus: OrderStatus
  total: number
  userId: string
  orderDetails: OrderDetail[]
  createdAt: string
  updatedAt: string
}

export type PageOrders = {
  pageNo: number
  pageSize: number
  totalPages: number
  totalElements: number
  items: Order[]
}

export type OrderResponse = {
  code: number
  message?: string
  data: Order
}

export type PageOrdersResponse = {
  code: number
  message?: string
  data: {
    pageNo: number
    pageSize: number
    totalPages: number
    totalElements: number
    items: Order[]
  }
}