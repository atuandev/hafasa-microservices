import http from '@/lib/http'
import { CategoryResponse, PageCategoriesResponse } from '@/types/category'

export const getPageCategories = async (
  pageNo: number, pageSize: number, sortBy: string, search: string,
) => {
  const { payload } = await http.get<PageCategoriesResponse>(`/product-service/categories/list?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}&search=${search}`)
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