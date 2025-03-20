'use client'

import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { useState, useTransition } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from '@/components/ui/input'
import { FormError } from '@/components/form/form-error'
import { updatePassword } from '@/actions/users/info'
import { UpdatePasswordSchema, UpdatePasswordSchemaType } from '@/schemas/user-info'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'


export default function FormUpdatePassword() {
  const [error, setError] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()

  const form = useForm<UpdatePasswordSchemaType>({
    resolver: zodResolver(UpdatePasswordSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      renewPassword: '',
    },
  })

  const onSubmit = (data: UpdatePasswordSchemaType) => {
    setError('')
    startTransition(async () => {
      const payload = await updatePassword(data)
      if (payload.code === 1000) {
        form.reset()
        toast.success('Cập nhật mật khẩu thành công')
      } else {
        setError(payload.message)
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4 w-full">
          <FormField
            control={form.control}
            name="oldPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mật khẩu cũ</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isPending} placeholder="Nhập mật khẩu cũ" type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mật khẩu mới</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isPending} placeholder="Nhập mật khẩu mới" type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="renewPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nhập lại mật khẩu mới</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isPending} placeholder="Nhập lại mật khẩu mới" type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormError message={error} />
          <Button loading={isPending} type="submit" className="w-full">
            Lưu
          </Button>
        </div>
      </form>
    </Form>
  )
}