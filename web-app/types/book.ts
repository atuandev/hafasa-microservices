import { Book } from 'lucide-react'

export type BookImage = {
  id: string
  url: string
}

export type Category = {
  id: string
  name: string
  slug: string
  description?: string
  createdAt: string
  updatedAt: string
}

export type Publisher = {
  id: string
  name: string
  slug: string
  description?: string
  createdAt: string
  updatedAt: string
}

export type Book = {
  id: string
  title: string
  slug: string
  thumbnail: string
  description: string
  author: string
  size: string
  pages: number
  weight: number
  publishYear: number
  importPrice: number
  price: number
  discountPrice: number
  stock: number
  sold: number
  reviewCount: number
  reviewStar: number
  discount?: Discount
  isNew: boolean
  isFeatured: boolean
  status: BookStatus
  category: Category
  publisher: Publisher
  bookImages: BookImage[]
  createdAt: string
  updatedAt: string
}

export enum BookStatus {
  ACTIVE = 'ACTIVE',
  DRAFT = 'DRAFT',
  DISABLED = 'DISABLED',
}

export type BookResponse = {
  code: number
  message: string
  data: Book
}

export type PageBooksResponse = {
  code: number
  message: string
  data: {
    pageNo: number
    pageSize: number
    totalPages: number
    totalElements: number
    items: Book[]
  }
}

export type PageBooks = {
  pageNo: number
  pageSize: number
  totalPages: number
  totalElements: number
  items: Book[]
}


export interface BookSearchParams {
  pageNo?: string
  pageSize?: string
  sortBy?: string
  books?: string
}

export type Discount = {
  id: string
  createdAt: string
  updatedAt: string
  name: string
  code: string
  percent: number
  startDate: string
  endDate: string
}