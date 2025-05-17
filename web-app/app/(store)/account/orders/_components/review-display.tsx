'use client'

import { Review } from "@/types/review"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { formatDate } from "@/utils/format"

type ReviewDisplayProps = {
  review: Review
}

export function ReviewDisplay({ review }: ReviewDisplayProps) {
  // Ensure we have a valid rating
  const rating = typeof review.rating === 'number' ? review.rating : 0
  
  // Handle possible null or invalid createdAt
  const createdDate = review.createdAt ? new Date(review.createdAt) : new Date()
  const formattedDate = formatDate(createdDate)
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="sm" className="flex items-center gap-1 h-9 px-3">
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
    </TooltipProvider>
  )
}