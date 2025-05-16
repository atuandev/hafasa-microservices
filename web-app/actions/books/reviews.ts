'use server'

import http from '@/lib/http'
import { PageReviewsResponse, Review } from '@/types/review'

export const getBookReviews = async (
  bookId: string,
  pageNo: number = 0,
  pageSize: number = 5,
  sortBy: string = 'createdAt:desc',
  rating: number = 0
): Promise<{
  items: Review[];
  totalPages: number;
  totalItems: number;
  currentPage: number;
}> => {
  const queryParams = new URLSearchParams({
    pageNo: pageNo.toString(),
    pageSize: pageSize.toString(),
    sortBy: sortBy,
    rating: rating.toString()
  })

  try {
    const { payload } = await http.get<PageReviewsResponse>(
      `/product-service/reviews/book/${bookId}?${queryParams.toString()}`
    )
    
    // Return a consistent structure regardless of the API response format
    if (payload && payload.data) {
      return {
        items: payload.data.items || [],
        totalPages: payload.data.totalPages || 0,
        totalItems: payload.data.totalItems || 0,
        currentPage: payload.data.currentPage || 0
      }
    } else {
      console.error('Unexpected API response structure:', payload)
      return {
        items: [],
        totalPages: 0,
        totalItems: 0,
        currentPage: 0
      }
    }
  } catch (error) {
    console.error('Error fetching book reviews:', error)
    return {
      items: [],
      totalPages: 0,
      totalItems: 0,
      currentPage: 0
    }
  }
}