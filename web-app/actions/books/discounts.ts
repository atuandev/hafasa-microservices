'use server'

import http from '@/lib/http'

import { PageDiscountsResponse } from '@/types/discount'
import { PageParams } from '@/types/page'

export const getPageDiscounts = async ({ pageNo, pageSize, sortBy, search }: PageParams) => {
  const url = `/product-service/discounts?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}&search=${search}`
  const { payload } = await http.get<PageDiscountsResponse>(url)
  return payload
}
