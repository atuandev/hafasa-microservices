'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { MainNavType } from '@/app/(admin)/_components/admin-sidebar-data'

type AdminSidebarMenuItemType = {
  items: MainNavType[]
}

export function NavMain({ items }: AdminSidebarMenuItemType) {
  const pathname = usePathname()

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Hafasa</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) =>  {
            const isActive = pathname === item.url || (pathname.startsWith(item.url) && item.url !== '/admin');
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                >
                  <Link href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}