'use client'
import { ArrowDown, ArrowUp, RefreshCcw } from 'lucide-react'

import { Button } from '../ui/button'
import { TypographySmall } from '@/components/typography'
import { SortDirection, useSort } from '@/hooks/use-sort'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface SortField {
  key: string
  label: string
}

interface SortConditionsProps {
  sortFields: SortField[]
  defaultField?: string
  defaultDirection?: SortDirection
  className?: string
}

const DEFAULT_DIRECTIONS = [
  { key: 'desc', label: 'Giảm dần', icon: <ArrowDown /> },
  { key: 'asc', label: 'Tăng dần', icon: <ArrowUp /> },
]

export function SortConditions({
  sortFields,
  defaultField = 'createdAt',
  defaultDirection = 'desc',
  className,
}: SortConditionsProps) {
  const { currentSort, updateSort, clearSort } = useSort({
    defaultField,
    defaultDirection,
  })

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <TypographySmall className='w-28'>Sắp xếp theo:</TypographySmall>

      <Select value={currentSort.field} onValueChange={field => updateSort(field, currentSort.direction)}>
        <SelectTrigger className='w-[10rem]'>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {sortFields.map(field => (
            <SelectItem key={field.key} value={field.key}>
              <TypographySmall>{field.label}</TypographySmall>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={currentSort.direction}
        onValueChange={direction => updateSort(currentSort.field, direction as SortDirection)}
      >
        <SelectTrigger className='w-[10rem]'>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {DEFAULT_DIRECTIONS.map(dir => (
            <SelectItem key={dir.key} value={dir.key}>
              <div className='flex items-center gap-2 w-full min-h-8'>
                <TypographySmall>{dir.label}</TypographySmall>
                <div className='size-6'>{dir.icon}</div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button variant='gray' onClick={clearSort}>
        <RefreshCcw className='h-4 w-4' />
      </Button>
    </div>
  )
}
