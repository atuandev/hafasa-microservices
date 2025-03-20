'use client'

import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/stores/cartStore'
import { Book } from '@/types/book'
import { bookQuantityStore } from '@/stores/bookQuantityStore'

type AddCartButtonProps = {
  book: Book
}

export function AddCartButton({ book }: AddCartButtonProps) {
  const { addItem } = useCartStore()
  const { quantity, setQuantity } = bookQuantityStore()

  const handleAddToCart = () => {
    addItem({ book, quantity })
    setQuantity(1)
    toast.success('Đã thêm vào giỏ hàng')
  }

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        className="flex-1"
        onClick={handleAddToCart}
        disabled={book.stock < quantity}
      >
        Thêm vào giỏ hàng
      </Button>
      <Button className="flex-1" disabled={book.stock < quantity}>Mua ngay</Button>
    </div>
  )
}