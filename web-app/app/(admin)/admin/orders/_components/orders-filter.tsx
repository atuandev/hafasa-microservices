'use client'

import { SortConditions } from '@/components/sort/sort-conditions'

const ORDER_SORT_FIELDS = [
  { key: 'createdAt', label: 'Ngày tạo' },
  { key: 'total', label: 'Tổng tiền' },
//   { key: 'status', label: 'Trạng thái' },
//   { key: 'username', label: 'Người dùng' },
]

export function OrdersFilter() {
  return (
    <div className="space-y-4 w-full">
      <SortConditions sortFields={ORDER_SORT_FIELDS} />
    </div>
  )
}