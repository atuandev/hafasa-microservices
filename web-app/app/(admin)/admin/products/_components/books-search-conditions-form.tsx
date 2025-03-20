'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { RefreshCcw, X } from 'lucide-react'

import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { SearchFormValues, searchFormSchema, useSearchConditions } from '@/hooks/use-search-conditions'
import { TypographySmall } from '@/components/typography'

const SEARCH_FIELDS = [
  { value: 'title', label: 'Tên sách' },
  { value: 'author', label: 'Tác giả' },
  { value: 'price', label: 'Giá' },
  { value: 'size', label: 'Kích thước' },
  { value: 'pages', label: 'Số trang' },
  { value: 'weight', label: 'Trọng lượng' },
  { value: 'stock', label: 'Số lượng' },
  { value: 'sold', label: 'Số lượng đã bán' },
  { value: 'reviewCount', label: 'Số đánh giá' },
  { value: 'reviewStar', label: 'Điểm đánh giá' },
]

const OPERATORS = [
  { value: '~', label: 'Chứa' },
  { value: ':', label: 'Bằng' },
  { value: '>', label: 'Lớn hơn' },
  { value: '<', label: 'Nhỏ hơn' },
  { value: '!', label: 'Không bằng' },
]

export function BooksSearchConditionsForm() {
  const { conditions, updateSearchParams, removeCondition, clearConditions } = useSearchConditions({
    entityKey: 'books',
  })

  const form = useForm<SearchFormValues>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      field: 'title',
      operator: '~',
      value: '',
    },
  })

  const handleSubmit = async (values: SearchFormValues) => {
    await updateSearchParams(values)
    form.reset()
  }

  const handleClear = async () => {
    await clearConditions()
    form.reset()
  }

  const getOperatorLabel = (op: string) => {
    return OPERATORS.find(operator => operator.value === op)?.label || op
  }

  const getFieldLabel = (fieldName: string) => {
    return SEARCH_FIELDS.find(field => field.value === fieldName)?.label || fieldName
  }

  return (
    <div className='space-y-4'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='flex gap-2'>
          <TypographySmall className='mt-2.5 w-28'>Tìm kiếm theo:</TypographySmall>

          <FormField
            control={form.control}
            name='field'
            render={({ field }) => (
              <FormItem className='w-[10rem]'>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder='Chọn trường' />
                    </SelectTrigger>
                    <SelectContent>
                      {SEARCH_FIELDS.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='operator'
            render={({ field }) => (
              <FormItem className='w-[10rem]'>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder='Toán tử' />
                    </SelectTrigger>
                    <SelectContent>
                      {OPERATORS.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='value'
            render={({ field }) => (
              <FormItem className='flex-1'>
                <FormControl>
                  <Input placeholder='Nhập giá trị tìm kiếm' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit' variant='secondary'>
            Thêm
          </Button>

          <Button variant='gray' onClick={handleClear}>
            <RefreshCcw className='h-4 w-4' />
          </Button>
        </form>
      </Form>

      {conditions.length > 0 && (
        <div className='flex flex-wrap gap-2'>
          {conditions.map((condition: SearchFormValues, index: number) => (
            <Badge key={index} variant='secondary' className='flex items-center gap-1 px-3 py-1'>
              <span className='text-sm'>
                {getFieldLabel(condition.field)} {getOperatorLabel(condition.operator)} {`'${condition.value}'`}
              </span>
              <Button
                variant='ghost'
                size='icon'
                className='h-4 w-4 p-0 hover:bg-transparent'
                onClick={() => removeCondition(index)}
              >
                <X className='h-3 w-3 text-gray-800' />
              </Button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
