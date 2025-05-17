'use server'

import http from '@/lib/http'
import { PageReviewsResponse, Review } from '@/types/review'

export type ReviewData = {
  userId: string
  bookId: string
  rating: number
  comment: string
}

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

export const checkReviewExists = async (
  bookId: string,
  userId: string
): Promise<Review | null> => {
  try {
    const { payload } = await http.get<{ data: Review | null }>(
      `/product-service/reviews/check?bookId=${bookId}&userId=${userId}`
    )
    
    if (payload && payload.data) {
      return payload.data
    }
    return null
  } catch (error) {
    console.error('Error checking if review exists:', error)
    return null
  }
}

export const addReview = async (
  reviewData: ReviewData
): Promise<Review | null> => {
  try {
    const { payload } = await http.post<{ data: Review }>(
      `/product-service/reviews/add`,
      JSON.stringify({
        userId: reviewData.userId,
        bookId: reviewData.bookId,
        rating: reviewData.rating,
        comment: reviewData.comment
      })
    )
    
    if (payload && payload.data) {
      return payload.data
    }
    return null
  } catch (error) {
    console.error('Error adding review:', error)
    throw new Error('Failed to add review. Please try again.')
  }
}