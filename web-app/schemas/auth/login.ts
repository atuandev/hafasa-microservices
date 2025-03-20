import { z } from "zod"

export const LoginSchema = z.object({
  username: z.string().min(3, {
    message: 'Tên đăng nhập phải chứa ít nhất 3 ký tự',
  }),
  password: z.string().min(6, {
    message: 'Mật khẩu phải chứa ít nhất 6 ký tự',
  }),
})
export type LoginSchemaType = z.infer<typeof LoginSchema>

export const LoginResponseSchema = z.object({
  code: z.number(),
  data: z.object({
    authenticated: z.boolean(),
    token: z.string(),
  }),
  message: z.string().optional(),
})

export type LoginResponseSchemaType = z.infer<typeof LoginResponseSchema>