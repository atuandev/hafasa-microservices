import http from '@/lib/http'
import { CategoryResponse, PageCategoriesResponse } from '@/types/category'
import { PageParams } from '@/types/page'

export const getPageCategories = async ({ pageNo, pageSize, sortBy, search }: PageParams) => {
  const url = `/product-service/categories/list?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}&search=${search}`
  const { payload } = await http.get<PageCategoriesResponse>(url)
  return payload
}

export const getCategoryById = async (categoryId: string) => {
  const { payload } = await http.get<CategoryResponse>(`/product-service/categories/${categoryId}`)
  return payload
}

export const getCategoryBySlug = async (slug: string) => {
  const { payload } = await http.get<CategoryResponse>(`/product-service/categories/slug/${slug}`)
  return payload
}
