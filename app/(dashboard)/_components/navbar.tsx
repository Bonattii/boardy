'use client'

import { UserButton } from '@clerk/nextjs'

export function Navbar() {
  return (
    <div className="flex items-center gap-x-4 p-5 bg-green-500">
      <div className="hidden lg:flex flex-1">{/* TODO: Add Search */}</div>

      <UserButton />
    </div>
  )
}
