'use client'

// Storage keys
const REVIEWED_BOOKS_KEY = 'reviewed_books'
const EDITED_REVIEWS_KEY = 'edited_reviews'

// Interface for stored review info
interface StoredReview {
  bookId: string
  reviewId: string
  timestamp: number  // Store timestamp for potential future cleanup
  edited?: boolean   // Flag to track if the review has been edited
}

/**
 * Save a review to localStorage
 * @param bookId - ID of the book that was reviewed
 * @param reviewId - ID of the submitted review
 */
export function saveReviewToStorage(bookId: string, reviewId: string): void {
  try {
    // Get current reviews from storage
    const storedReviews = getReviewedBooks()
    
    // Add the new review
    storedReviews.push({
      bookId,
      reviewId,
      timestamp: Date.now()
    })
    
    // Save back to localStorage
    localStorage.setItem(REVIEWED_BOOKS_KEY, JSON.stringify(storedReviews))
    console.log(`Review for book ${bookId} saved to localStorage`)
  } catch (error) {
    console.error('Error saving review to localStorage:', error)
  }
}

/**
 * Check if user has already reviewed a specific book
 * @param bookId - ID of the book to check
 * @returns boolean indicating if the book has been reviewed
 */
export function hasReviewedBook(bookId: string): boolean {
  try {
    const storedReviews = getReviewedBooks()
    return storedReviews.some(review => review.bookId === bookId)
  } catch (error) {
    console.error('Error checking review status in localStorage:', error)
    return false
  }
}

/**
 * Get all reviewed book IDs from localStorage
 * @returns Array of stored review objects
 */
export function getReviewedBooks(): StoredReview[] {
  try {
    const storedReviews = localStorage.getItem(REVIEWED_BOOKS_KEY)
    return storedReviews ? JSON.parse(storedReviews) : []
  } catch (error) {
    console.error('Error retrieving reviews from localStorage:', error)
    return []
  }
}

/**
 * Get a specific stored review by bookId
 * @param bookId - ID of the book
 * @returns The stored review info or null if not found
 */
export function getStoredReview(bookId: string): StoredReview | null {
  try {
    const storedReviews = getReviewedBooks()
    return storedReviews.find(review => review.bookId === bookId) || null
  } catch (error) {
    console.error('Error getting stored review:', error)
    return null
  }
}

/**
 * Mark a review as edited
 * @param reviewId - ID of the review that was edited
 */
export function markReviewAsEdited(bookId: string): void {
  try {
    const storedReviews = getReviewedBooks()
    const index = storedReviews.findIndex(review => review.bookId === bookId)
    
    if (index !== -1) {
      storedReviews[index].edited = true
      localStorage.setItem(REVIEWED_BOOKS_KEY, JSON.stringify(storedReviews))
      console.log(`Review for book ${bookId} marked as edited`)
    }
  } catch (error) {
    console.error('Error marking review as edited:', error)
  }
}

/**
 * Check if a review has been edited before
 * @param bookId - ID of the book
 * @returns boolean indicating if the review has been edited
 */
export function hasReviewBeenEdited(bookId: string): boolean {
  try {
    const storedReview = getStoredReview(bookId)
    return storedReview?.edited === true
  } catch (error) {
    console.error('Error checking if review was edited:', error)
    return false
  }
}

/**
 * Remove a review from localStorage
 * @param bookId - ID of the book whose review should be removed
 */
export function removeReviewFromStorage(bookId: string): void {
  try {
    const storedReviews = getReviewedBooks()
    const updatedReviews = storedReviews.filter(review => review.bookId !== bookId)
    localStorage.setItem(REVIEWED_BOOKS_KEY, JSON.stringify(updatedReviews))
    console.log(`Review for book ${bookId} removed from localStorage`)
  } catch (error) {
    console.error('Error removing review from localStorage:', error)
  }
}
