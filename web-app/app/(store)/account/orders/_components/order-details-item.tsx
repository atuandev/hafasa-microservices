'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { TypographyLarge, TypographySmall } from '@/components/typography'
import { formatVND } from '@/utils/format'
import { getBookById } from '@/actions/books/books'
import { AddReviewButton } from './add-review-button'
import { ReviewDisplay } from './review-display'
import { Review } from '@/types/review'
import { checkReviewExists } from '@/actions/books/reviews'

type OrderDetailsItemProps = {
  bookId: string
  price: number
  quantity: number
  orderId: string
}

export function OrderDetailsItem({ bookId, price, quantity, orderId }: OrderDetailsItemProps) {
  const [book, setBook] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [existingReview, setExistingReview] = useState<Review | null>(null)
  const [user, setUser] = useState<any>(null)
  
  useEffect(() => {
    // Get user from localStorage
    try {
      const currentUser = JSON.parse(localStorage.getItem('user') || 'null')
      setUser(currentUser)
    } catch (error) {
      console.error('Error parsing user from localStorage:', error)
    }
  }, [])

  const userId = user?.id

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookResult = await getBookById(bookId)
        setBook(bookResult.data)
        
        if (userId) {
          const review = await checkReviewExists(bookId, userId)
          setExistingReview(review)
        }
      } catch (error) {
        console.error('Error loading book details:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [bookId, userId])

  if (loading) {
    return <OrderDetailsItemSkeleton />
  }

  const subtotal = price * quantity

  const handleReviewAdded = (review: Review) => {
    setExistingReview(review)
  }

  return (
    <div className="grid grid-cols-12 gap-2 items-center py-3 px-2">
      {/* Product column - matches col-span-4 from header */}
      <div className="col-span-4">
        <Link 
          href={`/books/${book?.slug || bookId}`} 
          target="_blank" 
          className="flex gap-3 items-center"
        >
          {/* Fixed size image */}
          <div className="h-16 w-12 min-w-[48px] relative flex-shrink-0">
            <Image 
              src={book?.thumbnail || '/placeholder.png'} 
              alt={book?.title || 'Book cover'} 
              className="object-cover rounded-sm" 
              fill
              sizes="48px"
              priority
            />
          </div>
          
          {/* Title with ellipsis */}
          <div className="flex-1 overflow-hidden">
            <TypographySmall className="line-clamp-2 text-sm">
              {book?.title || 'Loading...'}
            </TypographySmall>
          </div>
        </Link>
      </div>
      
      {/* Price column - right aligned to match header */}
      <div className="col-span-2 text-right">
        <TypographySmall>{formatVND(price)}</TypographySmall>
      </div>
      
      {/* Quantity column - right aligned to match header */}
      <div className="col-span-2 text-right">
        <TypographySmall>{quantity}</TypographySmall>
      </div>
      
      {/* Subtotal column - right aligned to match header */}
      <div className="col-span-2 text-right">
        <TypographySmall className="text-rose-500 font-medium">{formatVND(subtotal)}</TypographySmall>
      </div>
      
      {/* Review column - center aligned to match header */}
      <div className="col-span-2 flex justify-center">
        {existingReview ? (
          <ReviewDisplay review={existingReview} />
        ) : (
          <AddReviewButton 
            bookId={bookId} 
            bookTitle={book?.title || ''}
            bookCover={book?.thumbnail || '/placeholder.png'}
            onReviewAdded={handleReviewAdded}
            userId={userId}
          />
        )}
      </div>
    </div>
  )
}

function OrderDetailsItemSkeleton() {
  return (
    <div className="grid grid-cols-12 gap-2 items-center py-3 px-2">
      {/* Product skeleton */}
      <div className="col-span-4">
        <div className="flex gap-3 items-center">
          <div className="h-16 w-12 bg-gray-200 animate-pulse rounded-sm flex-shrink-0"></div>
          <div className="h-10 bg-gray-200 animate-pulse rounded w-full"></div>
        </div>
      </div>
      
      {/* Price skeleton */}
      <div className="col-span-2 flex justify-end">
        <div className="h-6 bg-gray-200 animate-pulse rounded w-20"></div>
      </div>
      
      {/* Quantity skeleton */}
      <div className="col-span-2 flex justify-end">
        <div className="h-6 bg-gray-200 animate-pulse rounded w-8"></div>
      </div>
      
      {/* Subtotal skeleton */}
      <div className="col-span-2 flex justify-end">
        <div className="h-6 bg-gray-200 animate-pulse rounded w-24"></div>
      </div>
      
      {/* Review skeleton */}
      <div className="col-span-2 flex justify-center">
        <div className="h-8 bg-gray-200 animate-pulse rounded w-24"></div>
      </div>
    </div>
  )
}
