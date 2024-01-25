"use client"

import { cn } from "@/lib/utils"
import { Banknote, Box, Home } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const AdminMenu = () => {
  const pathname = usePathname()

  const isActive = (href: string) => pathname === href

  return (
    <div className="flex mt-auto border-t-2 bg-white">
      <Link
        href="/admin/dashboard"
        className={cn(
          "w-1/3 flex items-center justify-center p-4",
          !isActive("/admin/dashboard") && "text-muted-foreground"
        )}
      >
        <Home size={24} />
      </Link>
      <Link
        href="/admin/dashboard/products"
        className={cn(
          "w-1/3 flex items-center justify-center p-4",
          !isActive("/admin/dashboard/products") && "text-muted-foreground"
        )}
      >
        <Box size={24} />
      </Link>
      <Link
        href="/admin/dashboard/orders"
        className={cn(
          "w-1/3 flex items-center justify-center p-4",
          !isActive("/admin/dashboard/orders") && "text-muted-foreground"
        )}
      >
        <Banknote size={24} />
      </Link>
    </div>
  )
}

export default AdminMenu
