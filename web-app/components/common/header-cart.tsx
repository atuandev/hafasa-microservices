'use client'

import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import { useEffect, useState } from 'react'

import { useCartStore } from '@/stores/cartStore'

export function HeaderCart() {
  const { books } = useCartStore()
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    setCartCount(books?.length || 0)
  }, [books?.length])

  return (
    <Link href="/cart" className="relative flex flex-col items-center">
      <ShoppingCart className="text-gray-600" />
      <p className="text-sm text-gray-600">Giỏ hàng</p>
      <div className="absolute -top-2 right-2 bg-primary px-1.5 rounded-full">
        <p className="text-primary-foreground text-xs">{cartCount}</p>
      </div>
    </Link>
  )
}