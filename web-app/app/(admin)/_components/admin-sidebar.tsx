'use client'

import React from 'react'

import { User } from '@/types/user'
import { NavUser } from '@/app/(admin)/_components/nav-user'
import { NavMain } from '@/app/(admin)/_components/nav-main'
import { Sidebar, SidebarContent, SidebarFooter, SidebarRail } from '@/components/ui/sidebar'
import { sidebarData } from '@/app/(admin)/_components/admin-sidebar-data'

type AdminSidebarType = React.ComponentProps<typeof Sidebar> & {
  user: User
}

export function AdminSidebar({ user, ...props }: AdminSidebarType) {
  return (
    <Sidebar variant="inset" collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={sidebarData.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
