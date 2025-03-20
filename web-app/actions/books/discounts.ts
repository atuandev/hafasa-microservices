'use server'

import http from "@/lib/http"

import { PageDiscountsResponse } from "@/types/discount"

export const getDiscounts = async () => {
  const { payload } = await http.get<PageDiscountsResponse>('/product-service/discounts')
  return payload
}

