export type Review = {
  id: string
  comment: string
  rating: number
  createdAt: string
  updatedAt: string
  userId: string
  userName: string
  status: 'ACTIVE' | 'INACTIVE'
  book: {
    id: string
    title: string
  }
}

export type PageReviewsResponse = {
  data: {
    items: Review[]
    totalPages: number
    totalItems: number
    currentPage: number
  }
}