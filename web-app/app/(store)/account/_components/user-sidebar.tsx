'use client'

import { usePathname } from 'next/navigation'
import { KeyRound, MapPin, PanelLeft, ReceiptText, Settings, User } from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import Link from 'next/link'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { useState } from 'react'

const data = {
  nav: [
    { name: 'Tài khoản', icon: User, href: '/account' },
    { name: 'Mật khẩu', icon: KeyRound, href: '/account/password' },
    { name: 'Địa chỉ', icon: MapPin, href: '/account/addresses' },
    { name: 'Hóa đơn', icon: ReceiptText, href: '/account/orders' },
    { name: 'Cài đặt', icon: Settings, href: '/account/settings' },
  ],
}

type UserSidebarType = {
  isMobile?: boolean
}

export function UserSidebar({ isMobile }: UserSidebarType) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const closeSheet = () => setIsOpen(false)

  if (isMobile) return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        <div className="block md:hidden mb-4 p-2 hover:bg-sidebar rounded-lg w-fit">
          <PanelLeft size={20} />
        </div>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Thanh bên</SheetTitle>
        </SheetHeader>
        <Sidebar collapsible="none" className="rounded-lg pt-2 md:hidden block mt-6">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {data.nav.map((item) => (
                    <SidebarMenuItem key={item.name}>
                      <SidebarMenuButton
                        asChild
                        isActive={item.href === pathname}
                      >
                        <Link href={item.href} onClick={closeSheet}>
                          <item.icon />
                          <span>{item.name}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      </SheetContent>
    </Sheet>
  )

  return (
    <Sidebar collapsible="none" className="rounded-lg pt-2 hidden md:block">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.nav.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton
                    asChild
                    isActive={item.href === pathname}
                  >
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
