import { z } from "zod"

export const orderSchema = z.object({
  userId: z.string(),
  receiverName: z.string().min(1, {
    message: 'Tên người nhận không được để trống',
  }),
  receiverPhone: z.string().min(10, {
    message: 'Số điện thoại không hợp lệ',
  }),
  address: z.string().min(1, {
    message: 'Địa chỉ không được để trống',
  }),
  paymentMethod: z.string().min(1, {
    message: 'Phương thức thanh toán không được để trống',
  }),
  total: z.number().min(1, {
    message: 'Tổng số tiền không hợp lệ',
  }),
  orderDetails: z
    .array(
      z.object({
        bookId: z.string(),
        quantity: z.number(),
        price: z.number(),
      })
    )
    .min(1, {
      message: 'Đơn hàng phải có ít nhất một sản phẩm',
    }),
})

export type OrderSchemaType = z.infer<typeof orderSchema>
