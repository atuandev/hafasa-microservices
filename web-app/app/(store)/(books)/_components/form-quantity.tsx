'use client'

import React from 'react'

import { TypographyLarge } from '@/components/typography'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { bookQuantityStore } from '@/stores/bookQuantityStore'

export function FormQuantity() {
  const { quantity, setQuantity, increment, decrement } = bookQuantityStore()

  const handleChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, parseInt(e.target.value) || 1)
    setQuantity(value)
  }

  return (
    <div className="flex items-center gap-4">
      <TypographyLarge>Số lượng:</TypographyLarge>
      <div className="flex items-center gap-2">
        <Button variant="gray" size="iconSmall" onClick={decrement}>
          -
        </Button>
        <Input
          value={quantity}
          maxLength={3}
          onChange={handleChangeQuantity}
          className="h-8 w-10 px-1"
        />
        <Button variant="gray" size="iconSmall" onClick={increment}>
          +
        </Button>
      </div>
    </div>
  )
}