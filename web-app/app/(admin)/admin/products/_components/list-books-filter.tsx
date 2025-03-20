'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { RefreshCcw } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { TypographySmall } from '@/components/typography'
import { Button } from '@/components/ui/button'
import { BookSearchConditions } from './search/books-search-conditions'
import { BookSortConditions } from './book-sort-conditions'
import { searchFormSchema, useSearchConditions, type SearchFormValues } from '@/hooks/use-search-conditions'

export function ListBookFilter() {
  const { clearConditions } = useSearchConditions({ entityKey: 'books' })

  const form = useForm<SearchFormValues>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      field: 'title',
      operator: '~',
      value: '',
    },
  })

  const handleClearConditions = () => {
    clearConditions()
    form.reset()
  }

  return (
    <div className='flex items-center justify-between'>
      <div className='space-y-4 w-full'>
        <Button variant='gray' onClick={handleClearConditions}>
          <RefreshCcw className='h-4 w-4' />
          <TypographySmall>Làm mới</TypographySmall>
        </Button>

        <BookSortConditions />
        <BookSearchConditions />
      </div>
    </div>
  )
}
