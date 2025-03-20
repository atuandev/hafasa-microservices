export type Address = {
  id: string
  userId: string
  receiverName: string
  receiverPhone: string
  address: string
  createdAt: string
  updatedAt: string
}

export type PageAddress = {
  pageNo: number
  pageSize: number
  totalPages: number
  totalElements: number
  items: Address[]
}

export type PageAddressResponse = {
  status: number
  message: string
  data: PageAddress
}
