import * as z from 'zod'

export const ForgotPasswordSchema = z.object({
  email: z.string().email({
    message: 'Email không hợp lệ',
  }),
})

export type ForgotPasswordSchemaType = z.infer<typeof ForgotPasswordSchema>