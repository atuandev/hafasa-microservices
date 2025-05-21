'use client'

import { useState, useEffect } from 'react'
import { Star, Loader2, User } from 'lucide-react'
import { formatDate } from '@/utils/format'
import { Review } from '@/types/review'
import { User as UserType } from '@/types/user'
import { Button } from '@/components/ui/button'
import { TypographyLarge, TypographyMuted } from '@/components/typography'
import { getBookReviews } from '@/actions/books/reviews'
import { getUserById } from '@/actions/users/user-by-id'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

type BookReviewsProps = {
  bookId: string
}

export function BookReviews({ bookId }: BookReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [userMap, setUserMap] = useState<Record<string, UserType>>({})
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [totalItems, setTotalItems] = useState(0)
  const [selectedRating, setSelectedRating] = useState(0)
  const [error, setError] = useState(false)
  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true)
      setError(false)
      
      try {
        const response = await getBookReviews(bookId, currentPage, 5, 'createdAt:desc', selectedRating)
        
        // Since our action now returns a consistent structure, we can use it directly
        const reviewData = response.items || []
        setReviews(reviewData)
        setTotalPages(response.totalPages || 0)
        setTotalItems(response.totalItems || 0)
        
        // Fetch user details for each review
        const userIds = reviewData.map(review => review.userId)
        const uniqueUserIds = [...new Set(userIds)]
        
        const newUserMap: Record<string, UserType> = {}
        await Promise.all(
          uniqueUserIds.map(async (userId) => {
            try {
              const userData = await getUserById(userId)
              if (userData) {
                newUserMap[userId] = userData
              }
            } catch (error) {
              console.error(`Error fetching user ${userId}:`, error)
            }
          })
        )
        
        setUserMap(newUserMap)
      } catch (error) {
        console.error('Error fetching reviews:', error)
        setError(true)
        setReviews([])
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [bookId, currentPage, selectedRating])

  const handleRatingFilter = (rating: number) => {
    setSelectedRating(rating)
    setCurrentPage(0)
  }

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          size={16}
          className={i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
        />
      ))
  }

  // Safe check for reviews array to prevent "length of undefined" error
  const hasReviews = Array.isArray(reviews) && reviews.length > 0

  return (
    <div className="bg-background rounded-md shadow-sm p-4 space-y-4">
      <div className="flex justify-between items-center">
        <TypographyLarge className="mb-2">
          Đánh giá sản phẩm {totalItems > 0 && `(${totalItems})`}
        </TypographyLarge>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        <Button
          variant={selectedRating === 0 ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleRatingFilter(0)}
        >
          Tất cả
        </Button>
        {[5, 4, 3, 2, 1].map((rating) => (
          <Button
            key={rating}
            variant={selectedRating === rating ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleRatingFilter(rating)}
            className="flex items-center gap-1"
          >
            {rating} <Star size={14} className="fill-yellow-400 text-yellow-400" />
          </Button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : error ? (
        <div className="text-center py-8 text-rose-500">
          Đã xảy ra lỗi khi tải đánh giá. Vui lòng thử lại sau.
        </div>
      ) : !hasReviews ? (
        <div className="text-center py-8 text-muted-foreground">
          Chưa có đánh giá nào cho sản phẩm này
        </div>
      ) : (
        <>
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="border-b pb-4">                <div className="flex items-center gap-2 mb-1">
                  {renderStars(review.rating)}
                </div>                <div className="flex items-center gap-3 mb-2">
                  <Avatar className="size-10 border">
                    {userMap[review.userId]?.avatar ? (
                      <AvatarImage src={userMap[review.userId].avatar} />
                    ) : (
                      <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${userMap[review.userId]?.name || review.userName}`} />
                    )}
                    <AvatarFallback>
                      <User size={16} />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-medium">{userMap[review.userId]?.name || review.userName}</span>
                    <TypographyMuted className="text-xs">
                      {formatDate(new Date(review.createdAt))}
                    </TypographyMuted>
                  </div>
                </div>
                <p className="text-sm">{review.comment}</p>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 pt-4">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 0}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                Trang trước
              </Button>
              <span className="flex items-center px-4">
                {currentPage + 1}/{totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage >= totalPages - 1}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                Trang tiếp
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}