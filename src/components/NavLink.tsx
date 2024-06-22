'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export type NavLinkProps = Parameters<typeof Link>[0]

export const NavLink: React.FC<NavLinkProps> = ({ children, ...props }) => {
  const pathname = usePathname()

  return (
    <Link {...props} data-active={String(props.href) === pathname}>
      {children}
    </Link>
  )
}
