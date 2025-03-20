'use client'

import { useEffect, useState } from 'react'
import axiosClient from '@/lib/axiosClient'
import { PageCategories, PageCategoriesResponse } from '@/types/category'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { SelectContent, SelectItem } from '@/components/ui/select'
import { Button } from '@/components/ui/button'

export function ListCategories() {
  const [pageCategories, setPageCategories] = useState<PageCategories>()
  const [pageSize, setPageSize] = useState(8)

  useEffect(() => {
    const fetchPageCategories = async () => {
      const res = await axiosClient
        .get<PageCategoriesResponse>(`/product-service/categories/list?pageNo=1&pageSize=${pageSize}`)
      const data = res.data.data
      setPageCategories(data)
    }
    fetchPageCategories().then(r => r)
  }, [pageSize])

  if (!pageCategories) return (
    <SelectContent>
      <LoadingSpinner />
    </SelectContent>
  )

  return (
    <SelectContent className="max-h-[330px]">
      {pageCategories.items.map((category) => (
        <SelectItem
          key={category.slug}
          value={category.slug}
        >
          {category.name}
        </SelectItem>
      ))}
      <Button
        variant="gray"
        onClick={() => setPageSize(pageSize + 8)}
        className="w-full mt-4"
        size="sm"
      >
        Tải thêm
      </Button>
    </SelectContent>
  )
}