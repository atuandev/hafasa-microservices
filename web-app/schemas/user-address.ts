import { z } from 'zod'

export const UserAddressSchema = z.object({
  receiverName: z.string().min(1, {
    message: 'Tên không được để trống',
  }),
  receiverPhone: z.string().regex(/^\d{10}$/, {
    message: 'Số điện thoại gồm 10 số',
  }),
  address: z.string().min(1, {
    message: 'Địa chỉ không được để trống',
  }),
  userId: z.string().min(1, {
    message: 'userId không được để trống',
  }),
})

export type UserAddressSchemaType = z.infer<typeof UserAddressSchema>