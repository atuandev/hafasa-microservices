'use client'

import { useForm } from 'react-hook-form'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useTransition } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FormError } from '@/components/form/form-error'
import { FormSuccess } from '@/components/form/form-success'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { NewPasswordSchema, NewPasswordSchemaType } from '@/schemas/auth/new-password'
import { resetPassword } from '@/actions/auth/reset-password'

export function FormNewPassword() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isSpending, startTransition] = useTransition()

  // Get parameters from URL
  const email = searchParams.get('email')
  const token = searchParams.get('token')
  const otp = searchParams.get('otp')

  const form = useForm<NewPasswordSchemaType>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      email: email || '',
      token: token || '',
      otp: otp || '',
      newPassword: '',
      confirmPassword: '',
    },
  })

  const onSubmit = (data: NewPasswordSchemaType) => {
    setError('')
    setSuccess('')

    startTransition(async () => {
      try {
        const result = await resetPassword(data)

        if (result.success) {
          setSuccess(result.message || 'Mật khẩu đã được đặt lại thành công')
          
          // Redirect to login page after 2 seconds
          setTimeout(() => {
            router.push('/login')
          }, 2000)
        } else {
          setError(result.message || 'Không thể đặt lại mật khẩu')
        }
      } catch (error) {
        console.error(error)
        setError('Đã xảy ra lỗi khi đặt lại mật khẩu')
      }
    })
  }

  if (!email || !token || !otp) {
    return (
      <div className="p-4 rounded-md min-w-[380px]">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold mb-2 text-red-600">Lỗi</h2>
          <p className="text-gray-600">
            Thiếu thông tin cần thiết để đặt lại mật khẩu.
          </p>
        </div>
        <Button 
          onClick={() => router.push('/forgot-password')}
          className="w-full"
        >
          Quay lại trang quên mật khẩu
        </Button>
      </div>
    )
  }

  return (
    <div className="p-4 rounded-md min-w-[380px]">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold mb-2">Đặt mật khẩu mới</h2>
        <p className="text-gray-600">
          Vui lòng nhập mật khẩu mới cho tài khoản {email}.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4 w-full">
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mật khẩu mới</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      disabled={isSpending} 
                      placeholder="Nhập mật khẩu mới" 
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Xác nhận mật khẩu</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      disabled={isSpending} 
                      placeholder="Xác nhận mật khẩu mới" 
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button 
            loading={isSpending} 
            disabled={isSpending} 
            type="submit" 
            className="w-full"
          >
            Đặt lại mật khẩu
          </Button>
          <Button
            size="sm"
            variant="link"
            onClick={() => router.push('/forgot-password')}
            className="px-0 font-normal w-full text-gray-800"
            type="button"
          >
            Quay lại trang quên mật khẩu
          </Button>
        </form>
      </Form>
    </div>
  )
}
