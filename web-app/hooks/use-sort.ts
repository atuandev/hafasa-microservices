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

/**
 * A hook for managing sorting state in URL query parameters. 
 * 
 * URL: sortBy=title:asc
 * 
 * @param {SortConfig} config - Configuration object containing default sort field and direction
 * @returns {Object} Sorting state and update function
 *
 * @example
 * const { currentSort, updateSort } = useSort({
 *   defaultField: 'name',
 *   defaultDirection: 'asc'
 * })
 */
export const useSort = ({ defaultField, defaultDirection }: SortConfig) => {
  const [sortBy, setSortBy] = useQueryState(
    'sortBy',
    parseAsString.withDefault(`${defaultField}:${defaultDirection}`).withOptions({
      shallow: false, // This ensures the page updates when the sort changes
      throttleMs: 100 // Add debouncing to prevent too frequent updates
    })
  )

  // Parse sort string from URL into structured object
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

  const clearSort = () => { 
    setSortBy(null)
  }

  return {
    currentSort: parseSortString(sortBy),
    updateSort,
    clearSort,
  }
} 