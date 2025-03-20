export type Publisher = {
  id: string
  createdAt: string
  updatedAt: string
  name: string
  slug: string
  description: string
  image: string
  address: string
}

export type PublisherResponse = {
  code: number
  message: string
  data: Publisher[]
}

export type PagePublishers = {
  pageNo: number
  pageSize: number
  totalPages: number
  totalElements: number
  items: Publisher[]
}

export type PagePublishersResponse = {
  code: number
  message: string
  data: PagePublishers
}