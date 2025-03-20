'use client'

import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { User } from '@/types/user'
import { UserSchema, UserSchemaType } from '@/schemas/user-info'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { FormError } from '@/components/form/form-error'
import { FormSuccess } from '@/components/form/form-success'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { updateUserInfo } from '@/actions/users/info'
import { Button } from '@/components/ui/button'

type FormUserProps = {
  user: User
}

export default function FormUser({ user }: FormUserProps) {
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()

  const form = useForm<UserSchemaType>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      name: user.name,
    },
  })

  const onSubmit = (data: UserSchemaType) => {
    setError('')
    setSuccess('')
    startTransition(async () => {
      try {
        await updateUserInfo(user.id, data)
        setSuccess('Cập nhật thông tin thành công')
      } catch (error) {
        console.error(error)
        setError('Cập nhật thông tin thất bại')
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4 w-full">
          <Label>Email</Label>
          <Input value={user.email} disabled />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Họ tên</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isPending} placeholder="Nhập tên" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button loading={isPending} type="submit" className="w-full">
            Lưu
          </Button>
        </div>
      </form>
    </Form>
  )
}