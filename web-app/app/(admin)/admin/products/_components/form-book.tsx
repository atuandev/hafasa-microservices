'use client'

import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useState, useTransition } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'

import { Book, BookStatus } from '@/types/book'
import { createBook, updateBook } from '@/actions/books/books'
import { BookFormValues, bookSchema } from '@/schemas/book'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { FormError } from '@/components/form/form-error'
import { FormUploadBook } from '@/app/(admin)/admin/products/_components/form-upload-book'
import { FormBookDetail } from '@/app/(admin)/admin/products/_components/form-book-detail'
import { FormBookSidebar } from '@/app/(admin)/admin/products/_components/form-book-sidebar'
import { PageDiscounts } from '@/types/discount'
import { PagePublishers } from '@/types/publisher'
import { PageCategories } from '@/types/category'

type FormAddBookProps = {
  book?: Book
  discounts: PageDiscounts
  publishers: PagePublishers
  categories: PageCategories
}

export function FormBook({ discounts, publishers, categories, book }: FormAddBookProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string>('')

  const form = useForm<BookFormValues>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: book?.title || '',
      slug: book?.slug || '',
      thumbnail: book?.thumbnail || '',
      description: book?.description || '',
      author: book?.author || '',
      size: book?.size || '',
      pages: book?.pages || 0,
      weight: book?.weight || 0,
      publishYear: book?.publishYear || 0,
      importPrice: book?.importPrice || 0,
      price: book?.price || 0,
      stock: book?.stock || 0,
      sold: book?.sold || 0,
      reviewCount: book?.reviewCount || 0,
      reviewStar: book?.reviewStar || 0,
      discountCode: book?.discount?.code || '',
      isNew: book?.isNew || false,
      isFeatured: book?.isFeatured || false,
      status: book?.status || BookStatus.DRAFT,
      categorySlug: book?.category?.slug || '',
      publisherSlug: book?.publisher?.slug || '',
      bookImages: book?.bookImages || [],
    },
  })

  const onCreateSubmit = (data: BookFormValues) => {
    startTransition(async () => {
      const payload = await createBook(data)

      if (payload.code !== 1000) {
        setError(payload.message)
        return
      }

      toast.success('Thêm sách mới thành công')
      router.push(`/admin/products`)
    })
  }

  const onUpdateSubmit = (data: BookFormValues) => {
    startTransition(async () => {
      if (!book?.id) {
        toast.error('Không tìm thấy sách')
        return
      }

      const payload = await updateBook(book.id, data)

      if (payload.code !== 1000) {
        setError(payload.message)
        return
      }

      toast.success('Cập nhật sách thành công')
      router.push(`/admin/products`)
    })
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(book ? onUpdateSubmit : onCreateSubmit)} className='space-y-8'>
          <FormUploadBook form={form} book={book} />

          <div className='md:grid md:grid-cols-12 md:gap-6 space-y-6 md:space-y-0'>
            <FormBookDetail form={form} />
            <FormBookSidebar form={form} discounts={discounts} publishers={publishers} categories={categories} />
          </div>

          <Button type='submit' className='w-full' loading={isPending}>
            {book ? 'Cập nhật' : 'Thêm sách'}
          </Button>
        </form>
      </Form>
      <FormError message={error} />
    </div>
  )
}
