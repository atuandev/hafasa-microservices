'use client'

import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useState, useTransition, useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FormError } from '@/components/form/form-error'
import { FormSuccess } from '@/components/form/form-success'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { OtpVerificationSchema, OtpVerificationSchemaType } from '@/schemas/auth/otp-verification'
import { verifyOtpAndRegister } from '@/actions/auth/verify-otp'
import { RegisterSchemaType } from '@/schemas/auth/register'

interface FormOtpVerificationProps {
  email: string;
  token: string;
  registrationData: RegisterSchemaType;
  expiryTime: number;
}

export function FormOtpVerification({ email, token, registrationData, expiryTime }: FormOtpVerificationProps) {
  const router = useRouter()
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isSpending, startTransition] = useTransition()

  const form = useForm<OtpVerificationSchemaType>({
    resolver: zodResolver(OtpVerificationSchema),
    defaultValues: {
      email,
      token,
      otp: '',
      registrationData
    },
  })

  const onSubmit = (data: OtpVerificationSchemaType) => {
    setError('')
    setSuccess('')

    startTransition(async () => {
      try {
        const result = await verifyOtpAndRegister(data)

        if (result.success) {
          setSuccess(result.message || 'Xác thực thành công')
          router.push('/account')
        } else {
          setError(result.message || 'Xác thực thất bại')
        }
      } catch (error) {
        console.error(error)
        setError('Đã xảy ra lỗi khi xác thực OTP')
      }
    })
  }

  // Calculate remaining time
  const [remainingTime, setRemainingTime] = useState<number>(
    Math.max(0, Math.floor((expiryTime - Date.now()) / 1000))
  )

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

  return (
    <div className="p-4 rounded-md min-w-[380px]">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold mb-2">Xác thực OTP</h2>
        <p className="text-gray-600">
          Chúng tôi đã gửi mã OTP đến email {email}. Vui lòng nhập mã để hoàn tất đăng ký.
        </p>
        {remainingTime > 0 && (
          <p className="text-sm text-gray-500 mt-2">
            Mã OTP sẽ hết hạn sau: {Math.floor(remainingTime / 60)}:{(remainingTime % 60).toString().padStart(2, '0')}
          </p>
        )}
        {remainingTime === 0 && (
          <p className="text-sm text-red-500 mt-2">
            Mã OTP đã hết hạn. Vui lòng quay lại trang đăng ký để yêu cầu mã mới.
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
            Xác thực
          </Button>
          <Button
            size="sm"
            variant="link"
            onClick={() => router.push('/register')}
            className="px-0 font-normal w-full text-gray-800"
            type="button"
          >
            Quay lại trang đăng ký
          </Button>
        </form>
      </Form>
    </div>
  )
}
