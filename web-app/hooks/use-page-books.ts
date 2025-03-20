import { usePathname, useRouter, useSearchParams } from 'next/navigation'

type Filters = {
  search: string
  sortBy: string
  categorySlug: string
  pageSize: string
}

export const usePageBooks = () => {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  // Get current filters from URL
  const filters: Filters = {
    search: searchParams.get('search') || '',
    sortBy: searchParams.get('sortBy') || '',
    categorySlug: searchParams.get('categorySlug') || '',
    pageSize: searchParams.get('pageSize') || '',
  }

  // Helper function to build query string
  const buildQueryString = (newFilters: Partial<Filters>) => {
    const updatedFilters = { ...filters, ...newFilters }
    const queryParams = new URLSearchParams()

    Object.entries(updatedFilters).forEach(([key, value]) => {
      if (value) queryParams.set(key, value)
    })

    return queryParams.toString()
  }

  const handleSearch = (searchValue: string) => {
    const query = buildQueryString({ search: searchValue })
    router.push(`${pathname}?${query}`)
  }

  const handleSortBy = (sortValue: string) => {
    const query = buildQueryString({ sortBy: sortValue })
    router.push(`${pathname}?${query}`)
  }

  const handleCategory = (categoryValue: string) => {
    const query = buildQueryString({ categorySlug: categoryValue })
    router.push(`${pathname}?${query}`)
  }

  const handleClear = () => {
    router.push(pathname)
  }

  return {
    handleSearch,
    handleSortBy,
    handleCategory,
    handleClear,
    ...filters,
  }
}