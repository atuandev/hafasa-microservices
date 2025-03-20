'use client'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Search } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { usePageBooks } from '@/hooks/use-page-books'

const searchSchema = z.object({
  search: z.string().optional(),
})

type SearchSchemaType = z.infer<typeof searchSchema>

export function ListBooksHeader() {
  const { handleSearch, handleSortBy, sortBy } = usePageBooks()

  const form = useForm<SearchSchemaType>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      search: '',
    },
  })

  const onSubmit = (values: SearchSchemaType) => {
    handleSearch(values.search || '')
  }

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <Select value={sortBy} onValueChange={(value) => handleSortBy(value)}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Sắp xếp theo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="createdAt:desc">Mới nhất</SelectItem>
            <SelectItem value="title:asc">Tên a-z</SelectItem>
            <SelectItem value="title:desc">Tên z-a</SelectItem>
            <SelectItem value="price:asc">Giá tăng dần</SelectItem>
            <SelectItem value="price:desc">Giá giảm dần</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-2">
            <FormField
              control={form.control}
              name="search"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Tìm kiếm tiêu đề, tác giả"
                      type="text"
                      {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" size="icon">
              <Search />
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}