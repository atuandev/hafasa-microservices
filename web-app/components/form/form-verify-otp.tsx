'use client'

import { useForm } from 'react-hook-form'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useTransition, useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FormError } from '@/components/form/form-error'
import { FormSuccess } from '@/components/form/form-success'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { VerifyOTPSchema, VerifyOTPSchemaType } from '@/schemas/auth/verify-otp'
import { verifyResetOTP } from '@/actions/auth/verify-reset-otp'

export function FormVerifyOTP() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isSpending, startTransition] = useTransition()
  const [remainingTime, setRemainingTime] = useState<number>(0)

  // Get parameters from URL
  const email = searchParams.get('email')
  const token = searchParams.get('token')
  const expiryTimeParam = searchParams.get('expiryTime')
  const expiryTime = expiryTimeParam ? parseInt(expiryTimeParam) : 0

  const form = useForm<VerifyOTPSchemaType>({
    resolver: zodResolver(VerifyOTPSchema),
    defaultValues: {
      email: email || '',
      token: token || '',
      otp: '',
    },
  })

  // Calculate remaining time
  useEffect(() => {
    if (expiryTime) {
      setRemainingTime(Math.max(0, Math.floor((expiryTime - Date.now()) / 1000)))
    }
  }, [expiryTime])

  // Update remaining time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prev) => {
        const newTime = Math.max(0, prev - 1)
        if (newTime === 0) {
          clearInterval(interval)
        }
        return newTime
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const onSubmit = (data: VerifyOTPSchemaType) => {
    setError('')
    setSuccess('')

    startTransition(async () => {
      try {
        const result = await verifyResetOTP(data)

        if (result.success) {
          setSuccess(result.message || 'Xác thực mã OTP thành công')
          
          // Redirect to new password page with verified parameters
          const params = new URLSearchParams()
          params.append('email', data.email)
          params.append('token', data.token)
          params.append('otp', data.otp)
          
          // Redirect to the new password page
          setTimeout(() => {
            router.push(`/reset-password/new-password?${params.toString()}`)
          }, 1000)
        } else {
          setError(result.message || 'Mã OTP không hợp lệ')
        }
      } catch (error) {
        console.error(error)
        setError('Đã xảy ra lỗi khi xác thực mã OTP')
      }
    })
  }

  if (!email || !token || !expiryTime) {
    return (
      <div className="p-4 rounded-md min-w-[380px]">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold mb-2 text-red-600">Lỗi</h2>
          <p className="text-gray-600">
            Thiếu thông tin cần thiết để xác thực OTP.
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
        <h2 className="text-2xl font-bold mb-2">Xác thực mã OTP</h2>
        <p className="text-gray-600">
          Nhập mã OTP đã được gửi đến email {email}.
        </p>
        {remainingTime > 0 && (
          <p className="text-sm text-gray-500 mt-2">
            Mã OTP sẽ hết hạn sau: {Math.floor(remainingTime / 60)}:{(remainingTime % 60).toString().padStart(2, '0')}
          </p>
        )}
        {remainingTime === 0 && (
          <p className="text-sm text-red-500 mt-2">
            Mã OTP đã hết hạn. Vui lòng quay lại trang quên mật khẩu để yêu cầu mã mới.
          </p>
        )}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4 w-full">
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mã OTP</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      disabled={isSpending || remainingTime === 0} 
                      placeholder="Nhập mã OTP" 
                      className="text-center text-lg tracking-widest"
                      maxLength={6}
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
            disabled={isSpending || remainingTime === 0} 
            type="submit" 
            className="w-full"
          >
            Xác thực OTP
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
