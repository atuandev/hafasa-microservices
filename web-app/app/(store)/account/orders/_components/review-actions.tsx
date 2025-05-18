'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Star } from 'lucide-react'
import { Review } from '@/types/review'
import { toast } from 'sonner'
import { updateReview, deleteReview } from '@/actions/books/reviews'
import { 
  markReviewAsEdited, 
  hasReviewBeenEdited,
  removeReviewFromStorage 
} from '@/utils/review-storage'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'

type ReviewActionsProps = {
  review: Review
  bookTitle: string
  onReviewUpdated: (review: Review) => void
  onReviewDeleted: () => void
}

export function ReviewActions({ 
  review, 
  bookTitle,
  onReviewUpdated,
  onReviewDeleted
}: ReviewActionsProps) {
  // State for dialogs
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  
  // State for form
  const [rating, setRating] = useState(review.rating)
  const [comment, setComment] = useState(review.comment)
  const [submitting, setSubmitting] = useState(false)
  const [deleting, setDeleting] = useState(false)
  
  // Check if review has been edited before
  const hasBeenEdited = hasReviewBeenEdited(review.book?.id || '')
  const editDisabled = hasBeenEdited

  const handleEditSubmit = async () => {
    try {
      setSubmitting(true)
      
      if (rating < 1 || rating > 5) {
        toast.error('Vui lòng chọn số sao từ 1 đến 5')
        return
      }

      if (!comment.trim()) {
        toast.error('Vui lòng nhập nội dung đánh giá')
        return
      }
      
      const updatedReview = await updateReview(review.id, { rating, comment })
      
      if (updatedReview) {
        // Mark this review as edited in localStorage
        markReviewAsEdited(review.book?.id || '')
        
        toast.success('Cập nhật đánh giá thành công')
        onReviewUpdated(updatedReview)
        setEditDialogOpen(false)
      } else {
        toast.error('Có lỗi xảy ra khi cập nhật đánh giá')
      }
    } catch (error) {
      console.error('Error updating review:', error)
      toast.error('Có lỗi xảy ra khi cập nhật đánh giá')
    } finally {
      setSubmitting(false)
    }
  }
  
  const handleDelete = async () => {
    try {
      setDeleting(true)
      const success = await deleteReview(review.id)
      
      if (success) {
        // Remove from localStorage
        removeReviewFromStorage(review.book?.id || '')
        
        toast.success('Xóa đánh giá thành công')
        onReviewDeleted()
      } else {
        toast.error('Có lỗi xảy ra khi xóa đánh giá')
      }
      setDeleteDialogOpen(false)
    } catch (error) {
      console.error('Error deleting review:', error)
      toast.error('Có lỗi xảy ra khi xóa đánh giá')
      setDeleteDialogOpen(false)
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="flex gap-2">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => setEditDialogOpen(true)}
        disabled={editDisabled}
        title={editDisabled ? 'Đánh giá chỉ có thể sửa một lần' : 'Sửa đánh giá'}
      >
        {editDisabled ? 'Đã chỉnh sửa' : 'Sửa'}
      </Button>
      
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => setDeleteDialogOpen(true)}
        className="hover:bg-destructive hover:text-destructive-foreground"
      >
        Xóa
      </Button>
      
      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa đánh giá</DialogTitle>
            <DialogDescription>
              Sản phẩm: {bookTitle}
            </DialogDescription>
          </DialogHeader>
          
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
              <Label htmlFor="edit-comment">Nội dung</Label>
              <Textarea 
                id="edit-comment"
                placeholder="Nhập đánh giá của bạn..."
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="mt-2"
              />
            </div>
            
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setEditDialogOpen(false)}>Hủy</Button>
              <Button 
                onClick={handleEditSubmit} 
                disabled={submitting || !comment.trim()}
              >
                {submitting ? 'Đang cập nhật...' : 'Cập nhật đánh giá'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa đánh giá</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa đánh giá này không? 
              Hành động này không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              disabled={deleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleting ? 'Đang xóa...' : 'Xóa đánh giá'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
