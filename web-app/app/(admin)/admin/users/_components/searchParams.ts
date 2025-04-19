'use server'

import { createLoader, parseAsString } from 'nuqs/server'
import { DEFAULT_PAGE_NO, DEFAULT_PAGE_SIZE, DEFAULT_SORT_BY } from '@/constants'

const usersSearchParams = {
  page: parseAsString.withDefault(DEFAULT_PAGE_NO),
  pageSize: parseAsString.withDefault(DEFAULT_PAGE_SIZE),
  sortBy: parseAsString.withDefault(DEFAULT_SORT_BY),
}

export const loadSearchParams = createLoader(usersSearchParams)
