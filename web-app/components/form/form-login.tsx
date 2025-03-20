'use client'

import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useTransition } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import { login } from '@/actions/auth/login'
import { LoginSchema, LoginSchemaType } from '@/schemas/auth/login'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import { Button } from '@/components/ui/button'
import { FormError } from '@/components/form/form-error'
import { FormSuccess } from '@/components/form/form-success'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

export function FormLogin() {
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/account'

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const onSubmit = (data: LoginSchemaType) => {
    setError('')
    setSuccess('')
    startTransition(async () => {
      const res = await login(data)
      if (res && res.code === 1000) {
        setSuccess('Đăng nhập thành công')
        router.push(redirect)
      } else {
        setError('Tài khoản hoặc mật khẩu không chính xác')
      }
    })
  }

  return (
    <div className="p-4 rounded-md min-w-[480px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4 w-full">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} placeholder="Nhập username" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} disabled={isPending} placeholder="Nhập password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              size="sm"
              variant="link"
              asChild
              className="px-0 font-normal justify-end w-full text-gray-700"
            >
              <Link href="/login">Quên mật khẩu?</Link>
            </Button>
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button loading={isPending} type="submit" className="w-full">
            Đăng nhập
          </Button>
          <Button
            asChild
            size="sm"
            variant="link"
            className="font-normal w-full text-gray-700"
          >
            <Link href="/register">Chưa có tài khoản? Đăng ký ngay</Link>
          </Button>
        </form>
      </Form>
    </div>
  )
}
