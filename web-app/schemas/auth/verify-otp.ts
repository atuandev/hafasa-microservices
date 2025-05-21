import * as z from 'zod'

export const VerifyOTPSchema = z.object({
  email: z.string().email({
    message: 'Email không hợp lệ',
  }),
  otp: z.string().min(1, {
    message: 'Mã OTP là bắt buộc',
  }),
  token: z.string().min(1, {
    message: 'Token là bắt buộc',
  }),
})

export type VerifyOTPSchemaType = z.infer<typeof VerifyOTPSchema>
