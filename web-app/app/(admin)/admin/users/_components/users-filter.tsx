'use client'

import { SortConditions } from '@/components/sort/sort-conditions'

const USER_SORT_FIELDS = [
  { key: 'createdAt', label: 'Ngày tạo' },
  { key: 'name', label: 'Họ tên' },
  { key: 'email', label: 'Email' },
  { key: 'username', label: 'Username' },
//   { key: 'createdAt', label: 'ngày tạo' },
  
]

export function UsersFilter() {
  return (
    <div className="space-y-4 w-full">
      <SortConditions sortFields={USER_SORT_FIELDS} />
    </div>
  )
}