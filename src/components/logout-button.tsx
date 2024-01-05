"use client"

import { ChevronRight, LogOut } from "lucide-react"
import { signOut } from "next-auth/react"

export const LogoutButton = () => {
  return (
    <div
      className="flex gap-2 items-center text-destructive cursor-pointer"
      onClick={() => {
        signOut()
      }}
    >
      <LogOut width={24} height={24} />
      <span>Logout</span>
      <ChevronRight width={20} height={20} className="ml-auto" />
    </div>
  )
}
