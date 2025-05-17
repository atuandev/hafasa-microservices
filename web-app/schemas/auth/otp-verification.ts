import { z } from "zod"

export const OtpVerificationSchema = z.object({
  email: z.string().email({
    message: 'Email không hợp lệ',
  }),
  otp: z.string().min(6, {
    message: 'Mã OTP phải chứa ít nhất 6 ký tự',
  }),
  token: z.string(),
  registrationData: z.record(z.any())
})

export type OtpVerificationSchemaType = z.infer<typeof OtpVerificationSchema>