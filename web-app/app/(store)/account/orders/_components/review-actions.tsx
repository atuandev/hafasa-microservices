'use client'

import { useState } from "react"
import { Review } from "@/types/review"
import { Button } from "@/components/ui/button"
import { Star, Pencil, Trash2 } from "lucide-react"
import { updateReview, deleteReview } from "@/actions/books/reviews"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Label } from "@/components/ui/label"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

type ReviewActionsProps = {
  review: Review
  bookTitle: string
  onReviewUpdated: (updatedReview: Review) => void
  onReviewDeleted: () => void
}

export function ReviewActions({ review, bookTitle, onReviewUpdated, onReviewDeleted }: ReviewActionsProps) {
  const [isEditMode, setIsEditMode] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [rating, setRating] = useState(review.rating)
  const [comment, setComment] = useState(review.comment)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const handleEditClick = () => {
    setIsEditMode(true)
  }
  
  const handleCancelEdit = () => {
    setRating(review.rating)
    setComment(review.comment)
    setIsEditMode(false)
  }
  
  const handleSubmitEdit = async () => {
    try {
      setIsSubmitting(true)
      
      if (rating < 1 || rating > 5) {
        toast.error('Vui lòng chọn số sao từ 1 đến 5')
        return
      }

      if (!comment.trim()) {
        toast.error('Vui lòng nhập nội dung đánh giá')
        return
      }
      
      console.log('Updating review:', review.id, { rating, comment })
      const updatedReview = await updateReview(review.id, { rating, comment })
      
      if (updatedReview) {
        toast.success('Cập nhật đánh giá thành công')
        onReviewUpdated(updatedReview)
        setIsEditMode(false)
      } else {
        toast.error('Có lỗi xảy ra, vui lòng thử lại sau')
      }
    } catch (error) {
      console.error('Error updating review:', error)
      toast.error('Có lỗi xảy ra, vui lòng thử lại sau')
    } finally {
      setIsSubmitting(false)
    }
  }
  
  const handleDeleteConfirm = async () => {
    try {
      setIsSubmitting(true)
      
      console.log('Deleting review:', review.id)
      const success = await deleteReview(review.id)
      
      if (success) {
        toast.success('Xóa đánh giá thành công')
        setIsDeleteDialogOpen(false)
        onReviewDeleted()
      } else {
        toast.error('Có lỗi xảy ra, vui lòng thử lại sau')
      }
    } catch (error) {
      console.error('Error deleting review:', error)
      toast.error('Có lỗi xảy ra, vui lòng thử lại sau')
    } finally {
      setIsSubmitting(false)
    }
  }
  
  if (isEditMode) {
    return (
      <div className="space-y-4">
        <div>
          <Label>Đánh giá</Label>
          <div className="flex items-center gap-1 mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={18}
                className={`cursor-pointer transition-colors ${
                  star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 hover:text-yellow-200'
                }`}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
        </div>
        
        <div>
          <Label>Nội dung</Label>
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Nhập đánh giá của bạn..."
            className="mt-2"
            rows={3}
          />
        </div>
        
        <div className="flex justify-end gap-2">
          <Button variant="outline" size="sm" onClick={handleCancelEdit} disabled={isSubmitting}>
            Hủy
          </Button>
          <Button size="sm" onClick={handleSubmitEdit} disabled={isSubmitting}>
            {isSubmitting ? 'Đang lưu...' : 'Lưu'}
          </Button>
        </div>
      </div>
    )
  }
  
  return (
    <div className="flex flex-col gap-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={handleEditClick}
        className="flex items-center justify-start gap-2"
        title="Chỉnh sửa đánh giá"
      >
        <Pencil size={14} /> 
        <span>Chỉnh sửa</span>
      </Button>
      
      {/* <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsDeleteDialogOpen(true)}
        className="flex items-center justify-start gap-2 hover:text-red-500"
      >
        <Trash2 size={14} /> Xóa
      </Button> */}
      
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xóa đánh giá</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa đánh giá cho sách "{bookTitle}"? 
              Hành động này không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isSubmitting}>Hủy</AlertDialogCancel>
            <AlertDialogAction 
              onClick={(e) => { 
                e.preventDefault() 
                handleDeleteConfirm() 
              }}
              disabled={isSubmitting}
              className="bg-red-500 hover:bg-red-600"
            >
              {isSubmitting ? 'Đang xóa...' : 'Xóa'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
