import { z } from 'zod'

export const UserSchema = z.object({
  name: z.string().min(1, {
    message: 'Tên không được để trống',
  }),
})

export type UserSchemaType = z.infer<typeof UserSchema>

export const UpdatePasswordSchema = z.object({
  oldPassword: z.string().min(6, {
    message: 'Mật khẩu cũ chứa ít nhất 6 ký tự',
  }),
  newPassword: z.string().min(6, {
    message: 'Mật khẩu mới chứa ít nhất 6 ký tự',
  }),
  renewPassword: z.string().min(6, {
    message: 'Nhập lại mật khẩu mới chứa ít nhất 6 ký tự',
  }),
}).refine(data => data.newPassword === data.renewPassword, {
  message: 'Mật khẩu mới và nhập lại mật khẩu mới không khớp',
  path: ['renewPassword'],
})

export type UpdatePasswordSchemaType = z.infer<typeof UpdatePasswordSchema>