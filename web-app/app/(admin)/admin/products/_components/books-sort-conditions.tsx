import { SortConditions } from '@/components/sort/sort-conditions'

const BOOK_SORT_FIELDS = [
  { key: 'createdAt', label: 'Ngày tạo' },
  { key: 'title', label: 'Tên sách' },
  { key: 'price', label: 'Giá' },
  { key: 'stock', label: 'Số lượng' },
  { key: 'author', label: 'Tác giả' },
]

export function BooksSortConditions() {
  return <SortConditions sortFields={BOOK_SORT_FIELDS} />
}
