import { LogoutButton } from "@/components/logout-button"
import { Button } from "@/components/ui/button"
import { getCurrentUser } from "@/lib/session"
import { UserRole } from "@prisma/client"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"

const AdminDashboarPage = async () => {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/masuk")
  }
  if (user.role !== UserRole.ADMIN) {
    notFound()
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-2 h-10 items-center">
        <h1>Admin Dashboard</h1>
        <LogoutButton />
      </div>
      <div className="flex gap-2">
        <Link href="/admin/dashboard/products">
          <Button>Pengaturan produk</Button>
        </Link>
        <Link href="/admin/dashboard/orders">
          <Button>Pesanan</Button>
        </Link>
      </div>
    </div>
  )
}

export default AdminDashboarPage
