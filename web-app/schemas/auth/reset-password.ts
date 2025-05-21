import * as z from 'zod'

export const ResetPasswordSchema = z.object({
  email: z.string().email({
    message: 'Email không hợp lệ',
  }),
  otp: z.string().min(1, {
    message: 'Mã OTP là bắt buộc',
  }),
  token: z.string().min(1, {
    message: 'Token là bắt buộc',
  }),
  newPassword: z.string().min(6, {
    message: 'Mật khẩu phải có ít nhất 6 ký tự',
  }),
  confirmPassword: z.string().min(1, {
    message: 'Xác nhận mật khẩu là bắt buộc',
  }),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'Mật khẩu không khớp',
  path: ['confirmPassword'],
})

export type ResetPasswordSchemaType = z.infer<typeof ResetPasswordSchema>