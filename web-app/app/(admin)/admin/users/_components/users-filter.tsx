'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import { useTransition } from 'react'
import { parseAsString, useQueryState } from 'nuqs'
import { SortConditions } from '@/components/sort/sort-conditions'

const filterSchema = z.object({
  search: z.string().optional(),
})

type FilterFormValues = z.infer<typeof filterSchema>

const USER_SORT_FIELDS = [
  { key: 'createdAt', label: 'Ngày tạo' },
  { key: 'name', label: 'Họ tên' },
  { key: 'email', label: 'Email' },
  { key: 'username', label: 'Username' },
]

export function UsersFilter() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  
  const [page, setPage] = useQueryState('page', parseAsString.withDefault('1'))
  const [searchValue, setSearchValue] = useQueryState('search', parseAsString.withDefault(''))
  
  const form = useForm<FilterFormValues>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      search: searchValue || '',
    },
  })

  const onSubmit = (data: FilterFormValues) => {
    startTransition(async () => {
      await setSearchValue(data.search || '')
      await setPage('1')
      router.refresh()
    })
  }

  return (
    <div className="space-y-4 w-full">
      <SortConditions sortFields={USER_SORT_FIELDS} />
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex space-x-2">
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Tìm kiếm người dùng..."
                      className="pl-8 w-[300px]"
                      {...field}
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending}>Tìm kiếm</Button>
        </form>
      </Form>
    </div>
  )
}