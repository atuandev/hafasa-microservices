export interface Category {
  id: string
  name: string
  slug: string
}

export type PageCategoriesResponse = {
  code: number
  message: string
  data: {
    pageNo: number
    pageSize: number
    totalPages: number
    totalElements: number
    items: Category[]
  }
}

export type PageCategories = {
  pageNo: number
  pageSize: number
  totalPages: number
  totalElements: number
  items: Category[]
}

export type CategoryResponse = {
  code: number
  message: string
  data: Category
}
