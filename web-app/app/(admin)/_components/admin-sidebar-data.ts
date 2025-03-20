import { ChartNoAxesCombinedIcon, LucideIcon, PackageIcon, ReceiptIcon, SettingsIcon, UsersIcon } from 'lucide-react'

export type MainNavType = {
  title: string
  url: string
  icon: LucideIcon
}

// Data for the sidebar
export const sidebarData = {
  navMain: [
    {
      title: 'Biểu đồ',
      url: '/admin',
      icon: ChartNoAxesCombinedIcon,
    },
    {
      title: 'Sản phẩm',
      url: '/admin/products',
      icon: PackageIcon,
    },
    {
      title: 'Hóa đơn',
      url: '/admin/orders',
      icon: ReceiptIcon,
    },
    {
      title: 'Người dùng',
      url: '/admin/users',
      icon: UsersIcon,
    },
    {
      title: 'Cài đặt',
      url: '/admin/settings',
      icon: SettingsIcon,
    },
  ] as MainNavType[],
}