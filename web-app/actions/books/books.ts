'use server'

import http from '@/lib/http'
import { BookResponse, BookSearchParams, PageBooksResponse } from '@/types/book'
import { BookFormValues } from '@/schemas/book'

export const getPageBooks = async (
  pageNo: number,
  pageSize: number,
  sortBy: string,
  search: string,
  categorySlug: string
) => {
  let url = `/product-service/books/list?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}&search=${search}`
  if (categorySlug.length > 0) {
    url += `&categorySlug=${categorySlug}`
  }

  const { payload } = await http.get<PageBooksResponse>(url)

  return payload
}

export async function getBooksBySpecification({
  pageNo,
  pageSize,
  sortBy,
  books,
}: BookSearchParams): Promise<PageBooksResponse> {

  const queryParams = new URLSearchParams({
    pageNo: pageNo || '1',
    pageSize: pageSize || '12',
    sortBy: sortBy || 'createdAt:desc',
  })

  if (books) {
    queryParams.append('books', books)
  }

  const { payload } = await http.get<PageBooksResponse>(`/product-service/books/specifications?${queryParams.toString()}`)

  return payload
}

export const getBookById = async (bookId: string) => {
  const { payload } = await http.get<BookResponse>(`/product-service/books/${bookId}`)
  return payload
}

export const getBookBySlug = async (slug: string) => {
  const { payload } = await http.get<BookResponse>(`/product-service/books/slug/${slug}`)
  return payload
}

export const createBook = async (data: BookFormValues) => {
  console.log(data)
  const { payload } = await http.post<BookResponse>('/product-service/books/add', JSON.stringify(data))
  console.log(payload)
  return payload
}

export const updateBook = async (bookId: string, data: BookFormValues) => {
  const { payload } = await http.put<BookResponse>(`/product-service/books/${bookId}`, JSON.stringify(data))
  return payload
}

export const deleteBookById = async (bookId: string) => {
  const { payload } = await http.delete<BookResponse>(`/product-service/books/${bookId}`)
  return payload
}

