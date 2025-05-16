'use server'

import http from '@/lib/http'
import { PageReviewsResponse } from '@/types/review'

export const getBookReviews = async (
  bookId: string,
  pageNo: number = 0,
  pageSize: number = 5,
  sortBy: string = 'createdAt:desc',
  rating: number = 0
) => {
  const queryParams = new URLSearchParams({
    pageNo: pageNo.toString(),
    pageSize: pageSize.toString(),
    sortBy: sortBy,
    rating: rating.toString()
  })

  const { payload } = await http.get<PageReviewsResponse>(
    `/product-service/reviews/book/${bookId}?${queryParams.toString()}`
  )
  
  return payload.data
}