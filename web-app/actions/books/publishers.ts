'use server'

import http from '@/lib/http'
import { PagePublishersResponse, PublisherResponse } from '@/types/publisher'
import { PageParams } from '@/types/page'

export const getPagePublishers = async ({ pageNo, pageSize, sortBy, search }: PageParams) => {
  const url = `/product-service/publishers/list?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}&search=${search}`
  const { payload } = await http.get<PagePublishersResponse>(url)
  return payload
}

export const getPublisherById = async (publisherId: string) => {
  const { payload } = await http.get<PublisherResponse>(`/product-service/publishers/${publisherId}`)
  return payload
}

export const getPublisherBySlug = async (slug: string) => {
  const { payload } = await http.get<PublisherResponse>(`/product-service/publishers/slug/${slug}`)
  return payload
}

