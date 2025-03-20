'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

type NavLinkProps = {
  className?: string
  activeClassName?: string
  match?: string
  href: string
}

const NavLink = ({
  className,
  activeClassName,
  href,
  match,
  ...props
}: NavLinkProps) => {
  const pathname = usePathname()
  const isActive = match ? pathname.match(match) : pathname === href

  return (
    <Link
      className={cn(className, isActive && activeClassName)}
      href={href}
      {...props}
    ></Link>
  )
}

export { NavLink }

