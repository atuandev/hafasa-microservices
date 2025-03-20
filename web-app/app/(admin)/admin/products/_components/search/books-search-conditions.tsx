'use client'

import { useSearchConditions } from '@/hooks/use-search-conditions'
import { SearchConditionsForm } from './search-conditions-form'

export function BookSearchConditions() {
  const { conditions, updateSearchParams, removeCondition } = useSearchConditions({
    entityKey: 'books'
  })

  return (
    <SearchConditionsForm
      conditions={conditions}
      onSubmit={updateSearchParams}
      onRemove={removeCondition}
    />
  )
} 