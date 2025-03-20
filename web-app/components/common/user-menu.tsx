'use client'

import Link from 'next/link'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { RoleEnum, User } from '@/types/user'
import { logout } from '@/actions/auth/logout'
import { LogOut, MonitorCogIcon, SettingsIcon, UserIcon } from 'lucide-react'
import { redirect } from 'next/navigation'

type UserDetailProps = {
  user: User
}

export function UserMenu({ user }: UserDetailProps) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex flex-col items-center justify-center">
            <Avatar className="size-6">
              <AvatarImage src={user.avatar || '/images/default-avatar.svg'} />
            </Avatar>
            <p className="text-sm text-gray-600">Tài khoản</p>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="truncate">{user?.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href="/account">
            <DropdownMenuItem>
              <UserIcon />
              Thông tin cá nhân
            </DropdownMenuItem>
          </Link>
          {user.roles.map(role => role.name === RoleEnum.ADMIN && (
            <Link key={role.name} href="/admin">
              <DropdownMenuItem>
                <MonitorCogIcon />
                Trang quản trị
              </DropdownMenuItem>
            </Link>
          ))}
          <Link href="/account/settings">
            <DropdownMenuItem>
              <SettingsIcon />
              Cài đặt
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={async () => {
            await logout()
            redirect('/login')
          }}>
            <LogOut />
            Đăng xuất
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}