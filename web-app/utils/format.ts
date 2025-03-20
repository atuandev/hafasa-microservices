export const formatVND = (price: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
}

// Format date time to dd/MM/yyyy HH:mm:ss
export const formatDateTime = (date: string) => {
  return new Intl.DateTimeFormat('vi-VN', { dateStyle: 'short', timeStyle: 'medium' }).format(new Date(date))
}