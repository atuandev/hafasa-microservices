'use client'

// This file can be run in browser console to test localStorage functionality
import { saveReviewToStorage, hasReviewedBook, getReviewedBooks } from './review-storage'

// Test function to validate the localStorage functionality
export function testReviewStorage() {
  console.log('=== Testing Review Storage Utility ===')
  
  // Clear any existing test data
  localStorage.removeItem('reviewed_books')
  
  // Test empty state
  console.log('Initial state:', getReviewedBooks())
  console.log('Has reviewed book1?', hasReviewedBook('book1'))
  
  // Test saving a review
  saveReviewToStorage('book1', 'review1')
  console.log('After saving review for book1:', getReviewedBooks())
  console.log('Has reviewed book1?', hasReviewedBook('book1'))
  console.log('Has reviewed book2?', hasReviewedBook('book2'))
  
  // Test saving another review
  saveReviewToStorage('book2', 'review2')
  console.log('After saving review for book2:', getReviewedBooks())
  console.log('Has reviewed book1?', hasReviewedBook('book1'))
  console.log('Has reviewed book2?', hasReviewedBook('book2'))
  
  console.log('=== Test complete ===')
  return 'Review storage test complete'
}

// Export the function so it can be called from the browser console
// Example: import('/utils/review-storage.test.js').then(m => m.testReviewStorage())
