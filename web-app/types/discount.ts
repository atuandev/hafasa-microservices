export type Discount = {
  id: string
  createdAt: string
  updatedAt: string
  name: string
  code: string
  percent: number
  startDate: string
  endDate: string
}

export type DiscountResponse = {
  code: number
  message: string
  data: Discount[]
}

export type PageDiscounts = {
  pageNo: number
  pageSize: number
  totalPages: number
  totalElements: number
  items: Discount[]
}

export type PageDiscountsResponse = {
  code: number
  message: string
  data: PageDiscounts
}
