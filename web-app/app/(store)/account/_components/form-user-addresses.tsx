'use client'

import { useForm } from 'react-hook-form'
import { useState, useTransition } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'

import { User } from '@/types/user'
import { UserAddressSchema, UserAddressSchemaType } from '@/schemas/user-address'
import { addAddress } from '@/actions/users/address'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FormError } from '@/components/form/form-error'
import { FormSuccess } from '@/components/form/form-success'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { toast } from 'sonner'

type FormUserAddressesProps = {
  user: User
}

export default function FormUserAddresses({ user }: FormUserAddressesProps) {
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [formState, setFormState] = useState<boolean>(false)
  const [isPending, startTransition] = useTransition()

  const form = useForm<UserAddressSchemaType>({
    resolver: zodResolver(UserAddressSchema),
    defaultValues: {
      userId: user.id,
      receiverName: '',
      receiverPhone: '',
      address: '',
    },
  })

  const toggleForm = () => setFormState(!formState)

  const onSubmit = async (data: UserAddressSchemaType) => {
    setError('')
    setSuccess('')
    startTransition(async () => {
      try {
        await addAddress(data)
        setFormState(false)
        form.reset()
        toast.success('Thêm địa chỉ mới thành công')
      } catch (error) {
        setError((error as Error).message)
      }
    })
  }

  return (
    <div className="flex flex-col bg-sidebar gap-4 rounded-lg p-4">
      <Button variant="outline" onClick={toggleForm}>Thêm địa chỉ</Button>
      {formState && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-6">
                <FormField
                  control={form.control}
                  name="receiverName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Họ tên người nhận</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={isPending} placeholder="Nhập tên" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-6">
                <FormField
                  control={form.control}
                  name="receiverPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Số điện thoại</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={isPending} placeholder="Nhập số điện thoại" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-12">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Địa chỉ</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={isPending} placeholder="Nhập địa chỉ" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-12">
                <FormError message={error} />
                <FormSuccess message={success} />
              </div>
              <Button loading={isPending} type="submit" className="col-span-12">
                Lưu
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  )
}