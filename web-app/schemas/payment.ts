import { z } from 'zod'

export const paymentSchema = z.object({
  // orderId: z.string().min(1, {
  //     message: 'Mã đn hàng không được để trống',
  // }),
  returnUrl: z.string().min(1, {
    message: 'Url không hợp lệ',
  }),
  cancelUrl: z.string().min(1, {
    message: 'Url không hợp lệ',
  }),
  price: z.number().min(1, {
    message: 'Tổng số tiền không hợp lệ',
  }),
})

export type PaymentSchemaType = z.infer<typeof paymentSchema>
