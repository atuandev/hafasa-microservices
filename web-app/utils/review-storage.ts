'use client'

/**
 * Utility functions for managing review states in localStorage
 */

// Keys for localStorage
const REVIEWED_BOOKS_KEY = 'reviewed_books'
const EDITED_REVIEWS_KEY = 'edited_reviews'

type StoredReview = {
  bookId: string
  reviewId: string
  timestamp: number
}

// Save a review to localStorage
export const saveReviewToStorage = (bookId: string, reviewId: string): void => {
  if (typeof window === 'undefined') return
  
  try {
    // Get existing reviews
    const existingReviews: StoredReview[] = JSON.parse(
      localStorage.getItem(REVIEWED_BOOKS_KEY) || '[]'
    )
    
    // Check if this book is already in the list
    const existingIndex = existingReviews.findIndex(item => item.bookId === bookId)
    
    if (existingIndex >= 0) {
      // Update existing entry
      existingReviews[existingIndex] = {
        bookId,
        reviewId,
        timestamp: Date.now()
      }
    } else {
      // Add new entry
      existingReviews.push({
        bookId,
        reviewId,
        timestamp: Date.now()
      })
    }
    
    // Save back to localStorage
    localStorage.setItem(REVIEWED_BOOKS_KEY, JSON.stringify(existingReviews))
  } catch (error) {
    console.error('Error saving review to localStorage:', error)
  }
}

// Check if a book has been reviewed
export const hasReviewedBook = (bookId: string): boolean => {
  if (typeof window === 'undefined') return false
  
  try {
    const existingReviews: StoredReview[] = JSON.parse(
      localStorage.getItem(REVIEWED_BOOKS_KEY) || '[]'
    )
    return existingReviews.some(item => item.bookId === bookId)
  } catch (error) {
    console.error('Error checking if book has been reviewed:', error)
    return false
  }
}

// Get all reviewed books
export const getReviewedBooks = (): StoredReview[] => {
  if (typeof window === 'undefined') return []
  
  try {
    return JSON.parse(localStorage.getItem(REVIEWED_BOOKS_KEY) || '[]')
  } catch (error) {
    console.error('Error getting reviewed books:', error)
    return []
  }
}

// Remove a review from storage when it's deleted
export const removeReviewFromStorage = (bookId: string): void => {
  if (typeof window === 'undefined') return
  
  try {
    const existingReviews: StoredReview[] = JSON.parse(
      localStorage.getItem(REVIEWED_BOOKS_KEY) || '[]'
    )
    
    const updatedReviews = existingReviews.filter(item => item.bookId !== bookId)
    
    localStorage.setItem(REVIEWED_BOOKS_KEY, JSON.stringify(updatedReviews))
  } catch (error) {
    console.error('Error removing review from localStorage:', error)
  }
}

// Mark a review as having been edited
export const markReviewAsEdited = (reviewId: string): void => {
  if (typeof window === 'undefined') return
  
  try {
    const editedReviews: string[] = JSON.parse(
      localStorage.getItem(EDITED_REVIEWS_KEY) || '[]'
    )
    
    if (!editedReviews.includes(reviewId)) {
      editedReviews.push(reviewId)
      localStorage.setItem(EDITED_REVIEWS_KEY, JSON.stringify(editedReviews))
    }
  } catch (error) {
    console.error('Error marking review as edited:', error)
  }
}

// Check if a review has been edited before
export const hasReviewBeenEdited = (reviewId: string): boolean => {
  if (typeof window === 'undefined') return false
  
  try {
    const editedReviews: string[] = JSON.parse(
      localStorage.getItem(EDITED_REVIEWS_KEY) || '[]'
    )
    return editedReviews.includes(reviewId)
  } catch (error) {
    console.error('Error checking if review has been edited:', error)
    return false
  }
}
