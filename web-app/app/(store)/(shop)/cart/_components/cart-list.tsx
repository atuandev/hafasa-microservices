'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Trash2 } from 'lucide-react'

import { useCartStore } from '@/stores/cartStore'
import { formatVND } from '@/utils/format'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { TypographyH4, TypographyLarge, TypographyMuted, TypographySmall } from '@/components/typography'
import { Container } from '@/components/common/container'
import { useOrderStore } from '@/stores/orderStore'

export function CartList() {
  const { books, increaseQuantity, decreaseQuantity, removeItem } = useCartStore()
  const { setOrderDetails } = useOrderStore()
  const [cartCount, setCartCount] = useState(0)
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [selectAll, setSelectAll] = useState(false)

  useEffect(() => {
    setCartCount(books?.length || 0)
  }, [books])

  const handleCheckboxChange = (id: string) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(id)
        ? prevSelectedItems.filter((itemId) => itemId !== id)
        : [...prevSelectedItems, id],
    )
  }
  const handleSelectAllChange = () => {
    setSelectAll(!selectAll)
    setSelectedItems(!selectAll ? books.map((item) => item.book.id) : [])
  }

  useEffect(() => {
    if (selectedItems.length === books.length) {
      setSelectAll(true)
    } else {
      setSelectAll(false)
    }
  }, [selectedItems, books])

  useEffect(() => {
    const orderDetails = books
      .filter((item) => selectedItems.includes(item.book.id))
      .map((item) => ({
        book: item.book,
        quantity: item.quantity,
        price: item.book.discountPrice,
      }))
    setOrderDetails(orderDetails)
  }, [selectedItems, books, setOrderDetails])

  const totalPrices = books
    .filter((item) => selectedItems.includes(item.book.id))
    .reduce((acc, item) => acc + item.book.discountPrice * item.quantity, 0 )

  return (
    <div className="min-h-[70vh]">
      {cartCount > 0 ? (
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-9 space-y-4">
            <div className="bg-white rounded-md p-4 grid grid-cols-12 gap-2">
              <Checkbox
                id="all"
                className="col-span-1"
                checked={selectAll}
                onCheckedChange={handleSelectAllChange}
              />
              <TypographySmall className="col-span-6">Chọn tất cả ({cartCount} sản phẩm)</TypographySmall>
              <TypographySmall className="col-span-2">Số lượng</TypographySmall>
              <TypographySmall className="col-span-2">Thành tiền</TypographySmall>
            </div>
            <div className="bg-white rounded-md p-4 divide-y">
              {books.map((item) => (
                <div key={item.book.id} className="grid grid-cols-12 gap-2 items-center py-2">
                  <Checkbox
                    className="col-span-1"
                    id={item.book.id}
                    checked={selectedItems.includes(item.book.id)}
                    onCheckedChange={() => handleCheckboxChange(item.book.id)}
                  />
                  <Link href={`/${item.book.slug}`} className="col-span-6 flex gap-4 items-center">
                    <Image src={item.book.bookImages[0].url}
                           alt={item.book.title}
                           className="w-24 object-cover"
                           width={500}
                           height={500}
                    />
                    <div className="flex flex-col gap-2">
                      <TypographySmall>{item.book.title}</TypographySmall>
                      <TypographySmall className="text-primary">{formatVND(item.book.discountPrice)}</TypographySmall>
                    </div>
                  </Link>
                  <div className="col-span-2 flex items-center gap-2">
                    <Button variant="gray" size="iconSmall"
                            onClick={() => decreaseQuantity(item.book.id)}>-</Button>
                    <TypographySmall>{item.quantity}</TypographySmall>
                    <Button variant="gray" size="iconSmall"
                            onClick={() => increaseQuantity(item.book.id)}
                            disabled={item.book.stock <= item.quantity}
                    >+</Button>
                  </div>
                  <div className="col-span-2">
                    <TypographyLarge
                      className="text-rose-500">{formatVND(item.book.discountPrice * item.quantity)}</TypographyLarge>
                  </div>
                  <div className="col-span-1">
                    <Button size="icon" variant="ghost" onClick={() => removeItem(item.book.id)}>
                      <Trash2 />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-3 bg-white rounded-md p-4 h-fit">
            <TypographyH4 className="mb-4">Thành tiền</TypographyH4>
            <div className="flex items-center justify-between">
              <TypographySmall>Tổng số tiền (gồm VAT)</TypographySmall>
              <TypographyLarge className="text-primary">{formatVND(totalPrices)}</TypographyLarge>
            </div>
            <Link href="/order">
              <Button className="w-full mt-4">Thanh toán</Button>
            </Link>
          </div>
        </div>
      ) : (
        <Container className="min-h-[50vh] flex flex-col gap-4 items-center justify-center">
          <Image
            src={'https://cdn0.fahasa.com/skin//frontend/ma_vanese/fahasa/images/checkout_cart/ico_emptycart.svg'}
            alt="No cart item"
            className="w-52 object-cover"
            width={500}
            height={500}
          />
          <TypographyMuted>Chưa có sản phẩm trong giỏ hàng</TypographyMuted>
          <Link href={'/'}>
            <Button>Mua sắm ngay</Button>
          </Link>
        </Container>
      )}
    </div>
  )
}