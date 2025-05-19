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
  if (!userId || !bookId) {
    console.log('Missing userId or bookId in checkReviewExists', { userId, bookId })
    return null
  }

  try {
    // First, try direct check if supported by backend
    try {
      const { payload } = await http.get<{ data: Review | null }>(
        `/product-service/reviews/check?bookId=${bookId}&userId=${userId}`
      )
      
      if (payload && payload.data) {
        console.log('Found review via direct check:', payload.data)
        return payload.data
      }
    } catch (directCheckError) {
      // Fallback approach - this is more reliable but less efficient
      console.log('Direct check failed, trying fallback approach')
    }

    // Fallback: Get all user reviews and filter by bookId
    const { payload } = await http.get<PageReviewsResponse>(
      `/product-service/reviews/user/${userId}?pageSize=100`
    )
    
    if (payload?.data?.items) {
      const existingReview = payload.data.items.find(review => review.book?.id === bookId)
      console.log('Existing review found via user reviews:', existingReview || 'none')
      return existingReview || null
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

export const updateReview = async (
  reviewId: string,
  updateData: {
    rating: number
    comment: string
  }
): Promise<Review | null> => {
  try {
    console.log('Updating review:', reviewId, updateData);
    
    // Use the correct endpoint format shown in your Swagger UI
    const { payload } = await http.put<{ data: Review }>(
      `/product-service/reviews/${reviewId}`,
      JSON.stringify({
        rating: updateData.rating,
        comment: updateData.comment
      })
    )
    
    console.log('Update response:', payload);
    
    if (payload && payload.data) {
      // Add a small delay to ensure the API has time to process
      // This helps with rapid edits
      await new Promise(resolve => setTimeout(resolve, 300))
      return payload.data
    }
    return null
  } catch (error) {
    console.error('Error updating review:', error)
    throw new Error('Failed to update review. Please try again.')
  }
}

export const deleteReview = async (reviewId: string): Promise<boolean> => {
  try {
    console.log('Deleting review:', reviewId);
    
    // Use the correct endpoint format shown in your Swagger UI
    await http.delete(`/product-service/reviews/${reviewId}`)
    
    console.log('Review deleted successfully');
    return true
  } catch (error) {
    console.error('Error deleting review:', error)
    throw new Error('Failed to delete review. Please try again.')
  }
}