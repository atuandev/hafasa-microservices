import { parseAsString, useQueryState } from 'nuqs'

export type SortDirection = 'asc' | 'desc'

export interface SortState {
  field: string
  direction: SortDirection
}

interface SortConfig {
  defaultField: string
  defaultDirection: SortDirection
}

export const useSort = ({ defaultField, defaultDirection }: SortConfig) => {
  const [sortBy, setSortBy] = useQueryState(
    'sortBy',
    parseAsString.withDefault(`${defaultField}:${defaultDirection}`).withOptions({
      shallow: false, // This ensures the page updates when the sort changes
      throttleMs: 100 // Add debouncing to prevent too frequent updates
    })
  )

  const parseSortString = (sortString: string): SortState => {
    const [field, direction] = sortString.split(':')
    return {
      field: field || defaultField,
      direction: (direction === 'asc' ? 'asc' : 'desc') as SortDirection
    }
  }

  const updateSort = (field: string, direction: SortDirection) => {
    setSortBy(`${field}:${direction}`)
  }

  return {
    currentSort: parseSortString(sortBy),
    updateSort,
  }
} 