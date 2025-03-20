import * as z from 'zod'
import { BookStatus } from '@/types/book'

export const bookSchema = z
  .object({
    title: z.string().min(1, 'Tên sách không được để trống'),
    slug: z.string().min(1, 'Slug không được để trống'),
    thumbnail: z.string().min(1, 'Thumbnail không được để trống'),
    description: z.string().min(1, 'Mô tả không được để trống'),
    author: z.string().min(1, 'Tác giả không được để trống'),
    size: z
      .string()
      .min(1, 'Kích thước không được để trống')
      .regex(
        /^\d+(\.\d+)?\s*x\s*\d+(\.\d+)?\s*x\s*\d+(\.\d+)?\s*$/i,
        'Kích thước phải có dạng: Dài x rộng x cao\n'
      ),
    pages: z.number().int().positive('Số trang phải là số dương'),
    weight: z.number().int().positive('Số trang phải là số dương'),
    publishYear: z
      .number()
      .int()
      .positive('Năm xuất bản phải là số nguyên dương')
      .min(1900, 'Năm xuất bản phải lớn hơn 1900')
      .max(new Date().getFullYear(), 'Năm xuất bản không được lớn hơn năm hiện tại'),
    importPrice: z.number().positive('Giá nhập phải là số dương'),
    price: z.number().positive('Giá bán phải là số dương'),
    stock: z.number().int().nonnegative('Số lượng tồn kho phải là số nguyên không âm'),
    sold: z.number().int().nonnegative('Số lượng đã bán phải là số nguyên không âm'),
    discountCode: z.string().optional(),
    reviewCount: z.number().optional(),
    reviewStar: z.number().optional(),
    isNew: z.boolean(),
    isFeatured: z.boolean(),
    status: z.nativeEnum(BookStatus),
    categorySlug: z.string().min(1, 'Vui lòng chọn danh mục'),
    publisherSlug: z.string().min(1, 'Vui lòng chọn nhà xuất bản'),
    bookImages: z
      .array(
        z.object({
          url: z.string().url('URL ảnh không hợp lệ'),
        })
      )
      .min(1, 'Vui lòng tải lên ít nhất 1 ảnh'),
  })
  .refine(data => data.price > data.importPrice, {
    message: 'Giá bán phải lớn hơn giá nhập',
    path: ['price'],
  })

export type BookFormValues = z.infer<typeof bookSchema>
