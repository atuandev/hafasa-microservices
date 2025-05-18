'use client'

import { useState, useRef, useEffect } from "react"
import { Review } from "@/types/review"
import { Star, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { formatDate } from "@/utils/format"
import { ReviewActions } from "./review-actions"
import { cn } from "@/lib/utils"

type ReviewDisplayProps = {
  review: Review
  bookTitle?: string
  onReviewUpdated: (review: Review) => void
  onReviewDeleted: () => void
}

export function ReviewDisplay({ review, bookTitle = "", onReviewUpdated, onReviewDeleted }: ReviewDisplayProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  
  // Ensure we have a valid rating
  const rating = typeof review.rating === 'number' ? review.rating : 0
  
  // Handle possible null or invalid createdAt
  const createdDate = review.createdAt ? new Date(review.createdAt) : new Date()
  const formattedDate = formatDate(createdDate)
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }
  
  return (
    <TooltipProvider>
      <div className="relative" ref={dropdownRef}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center gap-1 h-9 px-3"
              onClick={toggleDropdown}
            >
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={12}
                    className={star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                  />
                ))}
              </div>
              <span className="ml-1">Đã đánh giá</span>
              <ChevronDown 
                size={12} 
                className={cn(
                  "ml-1 transition-transform duration-200",
                  isDropdownOpen && "transform rotate-180"
                )}
              />
            </Button>
          </TooltipTrigger>
          
          <TooltipContent side="right" align="start" className="max-w-[300px] p-4 space-y-2 z-50">
            <div className="flex items-center mb-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={16}
                  className={star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                />
              ))}
            </div>
            <div className="text-xs text-muted-foreground">
              {formattedDate}
            </div>
            <div className="text-sm">{review.comment || ""}</div>
          </TooltipContent>
        </Tooltip>
        
        {/* Custom dropdown menu */}
        {isDropdownOpen && (
          <div className="absolute z-50 top-full mt-1 right-0 w-auto min-w-[150px] bg-white border rounded-md shadow-md p-3">
            <div className="space-y-2">
              <div className="text-sm font-medium">Tùy chọn đánh giá</div>
              <ReviewActions 
                review={review}
                bookTitle={bookTitle || review.book?.title || ""}
                onReviewUpdated={onReviewUpdated}
                onReviewDeleted={onReviewDeleted}
              />
            </div>
          </div>
        )}
      </div>
    </TooltipProvider>  )
}