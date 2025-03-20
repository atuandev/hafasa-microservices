export const SEARCH_FIELDS = [
  { key: 'title', label: 'Tên sách' },
  { key: 'price', label: 'Giá' },
  { key: 'stock', label: 'Số lượng' },
] as const

export const SEARCH_OPERATORS = [
  { key: '~', label: 'Chứa' },
  { key: '>', label: 'Lớn hơn' },
  { key: '<', label: 'Nhỏ hơn' },
  { key: ':', label: 'Bằng' },
  { key: '!', label: 'Không bằng' },
] as const

export const SORT_FIELDS = [
  { key: 'title', label: 'Tên sách' },
  { key: 'price', label: 'Giá' },
  { key: 'stock', label: 'Số lượng' },
  { key: 'createdAt', label: 'Ngày tạo' },
] as const

export const SORT_DIRECTIONS = [
  { key: 'asc', label: 'Tăng dần' },
  { key: 'desc', label: 'Giảm dần' },
] as const 