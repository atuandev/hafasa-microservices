import Link from 'next/link'
import { User } from 'lucide-react'

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { TooltipPortal } from '@radix-ui/react-tooltip'
import { Button } from '@/components/ui/button'

export function AuthMenu() {
  return (
    <Tooltip>
      <TooltipTrigger>
        <div className="flex flex-col items-center">
          <User className="text-gray-600" />
          <p className="text-sm text-gray-600">Tài khoản</p>
        </div>
      </TooltipTrigger>
      <TooltipPortal>
        <TooltipContent
          side="bottom"
          align="end"
          className="w-52 p-2 bg-white rounded-lg shadow-lg flex flex-col gap-2">
          <Link href="/login">
            <Button className="w-full">
              Đăng nhập
            </Button>
          </Link>
          <Link href="/register">
            <Button variant="outline" className="w-full">
              Đăng ký
            </Button>
          </Link>
        </TooltipContent>
      </TooltipPortal>
    </Tooltip>
  )
}