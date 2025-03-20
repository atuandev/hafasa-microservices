import { z } from "zod"

export const RegisterSchema = z.object({
  name: z.string().min(1, {
    message: 'Tên không được để trống',
  }),
  email: z.string().email({
    message: 'Email không hợp lệ',
  }),
  username: z.string().min(3, {
    message: 'Tên đăng nhập phải chứa ít nhất 3 ký tự',
  }),
  password: z.string().min(6, {
    message: 'Mật khẩu phải chứa ít nhất 6 ký tự',
  }),
})

export type RegisterSchemaType = z.infer<typeof RegisterSchema>