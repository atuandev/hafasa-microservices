'use client'

import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FormError } from '@/components/form/form-error'
import { FormSuccess } from '@/components/form/form-success'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { ForgotPasswordSchema, ForgotPasswordSchemaType } from '@/schemas/auth/forgot-password'
import { forgotPassword } from '@/actions/auth/forgot-password'

export function FormForgotPassword() {
  const router = useRouter()
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isSpending, startTransition] = useTransition()

  const form = useForm<ForgotPasswordSchemaType>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = (data: ForgotPasswordSchemaType) => {
    setError('')
    setSuccess('')    
    startTransition(async () => {
      try {
        const result = await forgotPassword(data)

        if (result.success) {
          setSuccess(result.message || 'OTP đã được gửi thành công')
          
          // Create params object with required fields
          const params = new URLSearchParams()
          params.append('email', data.email)
          
          // Only append token and expiryTime if they exist
          if (result.token) {
            params.append('token', result.token)
          }
          
          if (result.expiryTime) {
            params.append('expiryTime', result.expiryTime.toString())
          }
          
          router.push(`/reset-password?${params.toString()}`)
        } else {
          setError(result.message || 'Không thể gửi OTP')
        }
      } catch (error) {
        console.error(error)
        setError('Đã xảy ra lỗi khi gửi OTP')
      }
    })
  }

  return (
    <div className="p-4 rounded-md min-w-[380px]">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold mb-2">Quên mật khẩu</h2>
        <p className="text-gray-600">
          Nhập email của bạn để nhận mã OTP đặt lại mật khẩu.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4 w-full">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      disabled={isSpending} 
                      placeholder="Nhập email của bạn" 
                      type="email"
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
            Gửi OTP
          </Button>
          <Button
            size="sm"
            variant="link"
            onClick={() => router.push('/login')}
            className="px-0 font-normal w-full text-gray-800"
            type="button"
          >
            Quay lại trang đăng nhập
          </Button>
        </form>
      </Form>
    </div>
  )
}