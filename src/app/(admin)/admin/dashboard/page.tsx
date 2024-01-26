import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { UserRole } from "@prisma/client"
import { notFound, redirect } from "next/navigation"

const AdminDashboarPage = async () => {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/masuk")
  }
  if (user.role !== UserRole.ADMIN) {
    notFound()
  }

  const products = await db.product.findMany()
  const orders = await db.order.findMany()

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-4">
        <div className="w-1/3 flex flex-col gap-2 border rounded-lg px-4 py-2">
          <h2 className="font-medium text-lg">Produk</h2>
          <span>{products.length}</span>
        </div>
        <div className="w-1/3 flex flex-col gap-2 border rounded-lg px-4 py-2">
          <h2 className="font-medium text-lg">Pesanan</h2>
          <span>{orders.length}</span>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboarPage
