import slugify from 'slugify'
import { useEffect } from 'react'

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { UseFormReturn } from 'react-hook-form'
import { BookFormValues } from '@/schemas/book'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { RequiredField } from '@/components/form/required-field'

type FormBookDetailProps = {
  form: UseFormReturn<BookFormValues>
}

export function FormBookDetail({ form }: FormBookDetailProps) {
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'title' && value.title) {
        const slug = slugify(value.title, { lower: true, strict: true })
        form.setValue('slug', slug, { shouldValidate: true })
      }
    })

    return () => subscription.unsubscribe()
  }, [form])

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>, onChange: (value: number) => void) => {
    const value = e.target.value === '' ? 0 : parseInt(e.target.value, 10)
    onChange(value)
  }

  return (
    <div className='md:col-span-8 bg-zinc-50 p-6 rounded-lg space-y-6 border'>
      <div className='grid grid-cols-12 gap-4'>
        <div className='col-span-6'>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Tên sách <RequiredField />
                </FormLabel>
                <FormControl>
                  <Input placeholder='Đắc nhân tâm' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='col-span-6'>
          <FormField
            control={form.control}
            name='slug'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input placeholder='dac-nhan-tam' disabled {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <div className='grid grid-cols-12 gap-4'>
        <div className='col-span-6'>
          <FormField
            control={form.control}
            name='author'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Tác giả <RequiredField />
                </FormLabel>
                <FormControl>
                  <Input placeholder='Dale Carnegie' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='col-span-6'>
          <FormField
            control={form.control}
            name='publishYear'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Năm xuất bản <RequiredField />
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder='2000'
                    type='number'
                    {...field}
                    onChange={e => handleNumberChange(e, field.onChange)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <FormField
        control={form.control}
        name='description'
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Mô tả <RequiredField />
            </FormLabel>
            <FormControl>
              <Textarea {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className='grid grid-cols-12 gap-4'>
        <div className='col-span-4'>
          <FormField
            control={form.control}
            name='size'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Kích thước (cm) <RequiredField />
                </FormLabel>
                <FormControl>
                  <Input placeholder='18 x 12 x 2' type='text' {...field} />
                </FormControl>
                <FormDescription>Dài x rộng x cao</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='col-span-4'>
          <FormField
            control={form.control}
            name='pages'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Số trang <RequiredField />
                </FormLabel>
                <FormControl>
                  <Input type='number' {...field} onChange={e => handleNumberChange(e, field.onChange)} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='col-span-4'>
          <FormField
            control={form.control}
            name='weight'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Cân nặng (gram) <RequiredField />
                </FormLabel>
                <FormControl>
                  <Input type='number' {...field} onChange={e => handleNumberChange(e, field.onChange)} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <div className='grid grid-cols-12 gap-4'>
        <div className='col-span-6'>
          <FormField
            control={form.control}
            name='importPrice'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Giá nhập <RequiredField />
                </FormLabel>
                <FormControl>
                  <Input type='number' {...field} onChange={e => handleNumberChange(e, field.onChange)} />
                </FormControl>
                <FormDescription>Giá khi nhập hàng.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='col-span-6'>
          <FormField
            control={form.control}
            name='price'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Giá bán <RequiredField />
                </FormLabel>
                <FormControl>
                  <Input type='number' {...field} onChange={e => handleNumberChange(e, field.onChange)} />
                </FormControl>
                <FormDescription>Giá bán phải lớn hơn giá nhập.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <div className='grid grid-cols-12 gap-4'>
        <div className='col-span-6'>
          <FormField
            control={form.control}
            name='stock'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Số lượng tồn kho <RequiredField />
                </FormLabel>
                <FormControl>
                  <Input type='number' {...field} onChange={e => handleNumberChange(e, field.onChange)} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='col-span-6'>
          <FormField
            control={form.control}
            name='sold'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Số lượng đã bán <RequiredField />
                </FormLabel>
                <FormControl>
                  <Input type='number' {...field} onChange={e => handleNumberChange(e, field.onChange)} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Book Flags */}
      <div className='grid grid-cols-12 gap-4'>
        <div className='col-span-6'>
          <FormField
            control={form.control}
            name='isNew'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <label
                    className={`flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 bg-background hover:bg-zinc-100 transition-colors ${
                      field.value ? 'border-primary/30' : ''
                    }`}
                  >
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    <div className='space-y-1 leading-none'>
                      <FormLabel>Sách mới</FormLabel>
                      <FormDescription>Những cuốn sách mới được thêm vào</FormDescription>
                      <FormMessage />
                    </div>
                  </label>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className='col-span-6'>
          <FormField
            control={form.control}
            name='isFeatured'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <label
                    className={`flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 bg-background hover:bg-zinc-100 transition-colors ${
                      field.value ? 'border-primary/30' : ''
                    }`}
                  >
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    <div className='space-y-1 leading-none'>
                      <FormLabel>Sách nổi bật</FormLabel>
                      <FormDescription>Những cuốn sách bán chạy nhất</FormDescription>
                      <FormMessage />
                    </div>
                  </label>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  )
}
