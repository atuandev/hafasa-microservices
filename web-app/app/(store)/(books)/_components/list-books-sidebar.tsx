'use client'

import { RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Select, SelectTrigger, SelectValue } from '@/components/ui/select'
import { usePageBooks } from '@/hooks/use-page-books'
import { ListCategories } from '@/app/(store)/(books)/_components/list-categories'

export function ListBooksSidebar() {
  const { handleClear, handleCategory, categorySlug } = usePageBooks()

  return (
    <>
      <div className="w-full">
        <Button variant="gray" onClick={handleClear} className="w-full">
          <RefreshCw /> Làm mới
        </Button>
      </div>
      <Select value={categorySlug} onValueChange={(value) => handleCategory(value)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Danh mục" />
        </SelectTrigger>

        <ListCategories />
      </Select>
    </>
  )
}