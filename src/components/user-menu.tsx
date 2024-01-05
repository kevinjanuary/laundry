"use client"

import { cn } from "@/lib/utils"
import { BellPlus, CircleUserRound, Home } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

const UserMenu = () => {
  const pathname = usePathname()

  const isActive = (href: string) => pathname === href

  return (
    <div className="flex mt-auto border-t-2">
      <Link
        href="/dashboard"
        className={cn(
          "w-1/3 flex items-center justify-center p-4",
          !isActive("/dashboard") && "text-muted-foreground"
        )}
      >
        <Home size={24} />
      </Link>
      <Link
        href="/dashboard/notifications"
        className={cn(
          "w-1/3 flex items-center justify-center p-4",
          !isActive("/dashboard/notifications") && "text-muted-foreground"
        )}
      >
        <BellPlus size={24} />
      </Link>
      <Link
        href="/dashboard/profile"
        className={cn(
          "w-1/3 flex items-center justify-center p-4",
          !isActive("/dashboard/profile") && "text-muted-foreground"
        )}
      >
        <CircleUserRound size={24} />
      </Link>
    </div>
  )
}

export default UserMenu
