'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { getUserInfo } from '@/actions/users/info'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Star } from 'lucide-react'
import { addReview } from '@/actions/books/reviews'
import { Review } from '@/types/review'
import { toast } from 'sonner'
import Image from 'next/image'
import { userStore } from '@/stores/userStore'
import { saveReviewToStorage } from '@/utils/review-storage'

type AddReviewButtonProps = {
  bookId: string
  bookTitle: string
  bookCover: string
  onReviewAdded: (review: Review) => void
  userId?: string // This prop might not be reliable
}

export function AddReviewButton({ 
  bookId, 
  bookTitle, 
  bookCover, 
  onReviewAdded
}: AddReviewButtonProps) {
  const [open, setOpen] = useState(false)
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [isFetchingUser, setIsFetchingUser] = useState(false)
  
  // Use Zustand store instead of prop
  const storeUser = userStore((state) => state.user)
  const setStoreUser = userStore((state) => state.setUser)

  // Fetch user info when needed
  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!storeUser) {
        try {
          setIsFetchingUser(true)
          const userData = await getUserInfo()
          setStoreUser(userData)
        } catch (error) {
          console.error('Error fetching user info:', error)
        } finally {
          setIsFetchingUser(false)
        }
      }
    }
    
    fetchUserInfo()
  }, [storeUser, setStoreUser])

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen)
  }

  const handleButtonClick = () => {
    setOpen(true)
  }

  const handleSubmit = async () => {
    // Always get the latest user info when submitting
    try {
      setSubmitting(true)
      
      // Fetch fresh user info for each submission to ensure we have the current user
      const userInfo = storeUser || await getUserInfo()
      
      if (!userInfo || !userInfo.id) {
        toast.error('Không thể xác định người dùng. Vui lòng đăng nhập lại.')
        console.error('No user ID available when submitting review')
        return
      }
      
      if (rating < 1 || rating > 5) {
        toast.error('Vui lòng chọn số sao từ 1 đến 5')
        return
      }

      if (!comment.trim()) {
        toast.error('Vui lòng nhập nội dung đánh giá')
        return
      }

      const reviewData = {
        userId: userInfo.id,
        bookId,
        rating,
        comment
      }

      console.log('Submitting review with data:', reviewData)
        const review = await addReview(reviewData)
      
      if (review) {
        // Save review info to localStorage to persist across page reloads
        saveReviewToStorage(bookId, review.id)
        
        toast.success('Đánh giá thành công')
        onReviewAdded(review)
        setOpen(false)
      } else {
        toast.error('Có lỗi xảy ra, vui lòng thử lại sau')
      }
    } catch (error) {
      console.error('Error adding review:', error)
      toast.error('Có lỗi xảy ra, vui lòng thử lại sau')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleButtonClick}
        className="cursor-pointer"
        disabled={isFetchingUser}
      >
        {isFetchingUser ? 'Đang tải...' : 'Đánh giá'}
      </Button>
      
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Đánh giá sản phẩm</DialogTitle>
            <DialogDescription>
              Chia sẻ cảm nhận của bạn về sản phẩm này.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="relative w-20 h-24">
              <Image
                src={bookCover || '/placeholder.png'}
                alt={bookTitle}
                fill
                className="object-cover rounded-md"
              />
            </div>
            <div>
              <h4 className="font-medium line-clamp-2">{bookTitle}</h4>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label>Đánh giá</Label>
              <div className="flex items-center gap-1 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={24}
                    className={`cursor-pointer transition-colors ${
                      star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 hover:text-yellow-200'
                    }`}
                    onClick={() => setRating(star)}
                  />
                ))}
              </div>
            </div>
            
            <div>
              <Label htmlFor="comment">Nội dung</Label>
              <Textarea 
                id="comment"
                placeholder="Nhập đánh giá của bạn..."
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="mt-2"
              />
            </div>
            
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setOpen(false)}>Hủy</Button>
              <Button 
                onClick={handleSubmit} 
                disabled={submitting || !comment.trim()}
              >
                {submitting ? 'Đang gửi...' : 'Gửi đánh giá'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
