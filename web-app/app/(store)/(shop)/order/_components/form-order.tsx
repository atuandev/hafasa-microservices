'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { createOrder } from '@/actions/orders/order'
import { TypographyH4, TypographyLarge, TypographySmall } from '@/components/typography'
import { Button } from '@/components/ui/button'
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { orderSchema, OrderSchemaType } from '@/schemas/order'
import { useCartStore } from '@/stores/cartStore'
import { useOrderStore } from '@/stores/orderStore'
import { PageAddress } from '@/types/address'
import { OrderDetailRequest, PaymentMethod } from '@/types/order'
import { User } from '@/types/user'
import { formatVND } from '@/utils/format'

interface FormOrderProps {
  user: User
  addresses: PageAddress
}

export default function FormOrder({ user, addresses }: FormOrderProps) {
  const router = useRouter()
  const { removeItem } = useCartStore()
  const { orderDetails } = useOrderStore()
  const [selectedAddress, setSelectedAddress] = useState<string | undefined>(undefined)
  const [isPending, startTransition] = useTransition()

  const form = useForm<OrderSchemaType>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      userId: user.id,
      receiverName: '',
      receiverPhone: '',
      address: '',
      paymentMethod: PaymentMethod.COD,
      total: 0,
      orderDetails: [],
    },
  })

  useEffect(() => {
    if (orderDetails.length > 0) {
      const totalPrices = orderDetails.reduce((acc, item) => acc + item.book.discountPrice * item.quantity, 0)
      form.setValue('total', totalPrices)

      const orderDetailsRequest: OrderDetailRequest[] = orderDetails.map(item => ({
        bookId: item.book.id,
        quantity: item.quantity,
        price: item.book.discountPrice,
      }))
      form.setValue('orderDetails', orderDetailsRequest)
    }
  }, [orderDetails, form])

  const handleAddressChange = (addressId: string) => {
    setSelectedAddress(addressId)
    const address = addresses.items.find(address => address.id === addressId)
    form.setValue('address', address?.address || '')
    form.setValue('receiverName', address?.receiverName || '')
    form.setValue('receiverPhone', address?.receiverPhone || '')
  }

  function onSubmit(values: z.infer<typeof orderSchema>) {
    console.log(values)
    startTransition(async () => {
      const res = await createOrder(values)

      if (res.code !== 1000) {
        toast.error(res.message)
        return
      }

      // Remove selected items from the cart
      values.orderDetails.forEach(item => {
        removeItem(item.bookId)
      })

      toast.success('Đặt hàng thành công')
      router.push('/account/orders')
    })
  }

  return (
    <div className='grid grid-cols-12 gap-4'>
      <div className='col-span-8 space-y-4'>
        <div className='bg-white rounded-md p-4 divide-y'>
          <div className='flex items-center justify-between'>
            <TypographyLarge className='mb-4'>Thông tin người nhận</TypographyLarge>
            <Link href={'/account/addresses'}>
              <Button variant='outline' size='sm'>
                Thêm địa chỉ
              </Button>
            </Link>
          </div>
          {addresses && (
            <RadioGroup value={selectedAddress} onValueChange={handleAddressChange}>
              {addresses.items.length > 0 ? (
                addresses.items.map(address => (
                  <div key={address.id} className='flex items-center gap-2 p-4'>
                    <RadioGroupItem value={address.id} id={address.id} />
                    <Label htmlFor={address.id} className='grid grid-cols-12'>
                      <TypographySmall className='col-span-3'>{address.receiverName}</TypographySmall>
                      <TypographySmall className='col-span-2'>{address.receiverPhone}</TypographySmall>
                      <TypographySmall className='col-span-7 text-right'>{address.address}</TypographySmall>
                    </Label>
                  </div>
                ))
              ) : (
                <div className='p-4'>
                  <TypographySmall>
                    Vui lòng tạo địa chỉ trước khi mua hàng tại{' '}
                    <Link href={'/account/addresses'} className='text-sky-500 underline'>
                      đây
                    </Link>
                  </TypographySmall>
                </div>
              )}
            </RadioGroup>
          )}
        </div>

        <div className='bg-white rounded-md p-4 divide-y'>
          <TypographyLarge className='mb-4'>Phương thức thanh toán</TypographyLarge>
          <RadioGroup
            value={form.watch('paymentMethod')}
            onValueChange={value => form.setValue('paymentMethod', value)}
          >
            <div className='flex items-center space-x-2 p-4'>
              <RadioGroupItem value={PaymentMethod.COD} id='COD' />
              <Label htmlFor='COD'>Thanh toán khi nhận hàng</Label>
            </div>
            <div className='flex items-center space-x-2 p-4'>
              <RadioGroupItem value={PaymentMethod.VN_PAY} id='VN_PAY' />
              <Label htmlFor='VN_PAY'>Thanh toán qua VNPay</Label>
            </div>
          </RadioGroup>
        </div>

        <div className='bg-white rounded-md p-4 divide-y'>
          <TypographyLarge className='mb-4'>Thông tin đơn hàng</TypographyLarge>
          <div className='grid grid-cols-12 gap-2 items-center py-2'>
            <TypographySmall className='col-span-6'>Sản phẩm</TypographySmall>
            <TypographySmall className='col-span-2'>Đơn giá</TypographySmall>
            <TypographySmall className='col-span-2'>Số lượng</TypographySmall>
            <TypographySmall className='col-span-2'>Thành tiền</TypographySmall>
          </div>
          {orderDetails.map(item => (
            <div key={item.book.id} className='grid grid-cols-12 gap-2 items-center py-2'>
              <div className='col-span-6 flex gap-4 items-center'>
                <Image
                  src={item.book.bookImages[0].url}
                  alt={item.book.title}
                  className='w-24 object-cover'
                  width={500}
                  height={500}
                />
                <TypographySmall>{item.book.title}</TypographySmall>
              </div>
              <div className='col-span-2'>
                <TypographySmall className=''>{formatVND(item.book.discountPrice)}</TypographySmall>
              </div>
              <div className='col-span-2'>
                <TypographySmall className=''>{item.quantity}</TypographySmall>
              </div>
              <div className='col-span-2'>
                <TypographyLarge className='text-rose-500'>
                  {formatVND(item.book.discountPrice * item.quantity)}
                </TypographyLarge>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='col-span-4 bg-white rounded-md p-4 h-fit'>
        <TypographyH4 className='mb-4'>Thành tiền</TypographyH4>
        <div className='flex items-center justify-between'>
          <TypographySmall>Tổng số tiền (gồm VAT)</TypographySmall>
          <TypographyLarge className='text-primary'>{formatVND(form.watch('total'))}</TypographyLarge>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=''>
            <FormField
              name='userId'
              render={() => (
                <FormItem>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='receiverName'
              render={() => (
                <FormItem>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='receiverPhone'
              render={() => (
                <FormItem>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='address'
              render={() => (
                <FormItem>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='paymentMethod'
              render={() => (
                <FormItem>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='total'
              render={() => (
                <FormItem>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='orderDetails'
              render={() => (
                <FormItem>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className='w-full mt-4' type='submit' disabled={isPending}>
              Xác nhận thanh toán
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
