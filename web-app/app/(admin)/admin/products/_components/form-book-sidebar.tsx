'use client'

import axiosClient from '@/lib/axiosClient'
import { startTransition, useEffect, useState } from 'react'

import { RequiredField } from '@/components/form/required-field'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { BookFormValues } from '@/schemas/book'
import { BookStatus } from '@/types/book'
import { PageCategories, PageCategoriesResponse } from '@/types/category'
import { PageDiscounts } from '@/types/discount'
import { PagePublishers, PagePublishersResponse } from '@/types/publisher'
import { UseFormReturn } from 'react-hook-form'

type FormBookSidebarProps = {
  form: UseFormReturn<BookFormValues>
  discounts: PageDiscounts
}

export function FormBookSidebar({ form, discounts }: FormBookSidebarProps) {
  const [categories, setCategories] = useState<PageCategories>()
  const [publishers, setPublishers] = useState<PagePublishers>()

  useEffect(() => {
    startTransition(async () => {
      const { data: { data: categories } } = await axiosClient.get<PageCategoriesResponse>('/product-service/categories/list')
      console.log(categories)
      if (categories) setCategories(categories)

      const fetchPublishers = await axiosClient.get<PagePublishersResponse>('/product-service/publishers/list')
      if (fetchPublishers.data) setPublishers(fetchPublishers.data.data)
    })
  }, [])

  return (
    <div className='md:col-span-4 space-y-6 bg-zinc-50 p-4 rounded-lg border'>
      <FormField
        control={form.control}
        name='discountCode'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Discount</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder='Chọn mã' />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {discounts?.items.map(discount => (
                  <SelectItem key={discount.code} value={discount.code}>
                    {discount.code}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name='categorySlug'
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Danh mục <RequiredField />
            </FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder='Chọn danh mục' />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {categories?.items.map(category => (
                  <SelectItem key={category.slug} value={category.slug}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name='publisherSlug'
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Nhà xuất bản <RequiredField />
            </FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder='Chọn nhà xuất bản' />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {publishers?.items.map(publisher => (
                  <SelectItem key={publisher.slug} value={publisher.slug}>
                    {publisher.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name='status'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Trạng thái sách</FormLabel>
            <Select onValueChange={field.onChange} value={field.value} defaultValue={BookStatus.DRAFT}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder='Chọn trạng thái' />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {Object.values(BookStatus).map(status => (
                  <SelectItem
                    key={status}
                    value={status}
                    className={
                      status === BookStatus.ACTIVE
                        ? 'text-emerald-600'
                        : status === BookStatus.DRAFT
                        ? 'text-amber-600'
                        : 'text-red-600'
                    }
                  >
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
