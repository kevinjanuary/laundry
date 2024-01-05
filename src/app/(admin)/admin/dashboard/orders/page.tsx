import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { UserRole } from "@prisma/client"
import { notFound, redirect } from "next/navigation"

const AdminOrdersPage = async () => {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/masuk")
  }
  if (user.role !== UserRole.ADMIN) {
    notFound()
  }

  const orders = await db.order.findMany({
    include: {
      user: true,
      product: true,
    },
  })

  return (
    <>
      <h1>Admin Dashboard</h1>
      <h2>Daftar pesanan</h2>
      <div className="grid grid-cols-3 gap-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border px-3 py-2 rounded-md flex gap-4 text-sm"
          >
            <div className="w-full grid grid-cols-2">
              <span className="text-muted-foreground">Nama</span>
              <h2>: {order.user.name}</h2>
              <span className="text-muted-foreground">Produk</span>
              <p>: {order.product.name}</p>
              <span className="text-muted-foreground">Harga</span>
              <p>: {order.product.price}</p>
              <span className="text-muted-foreground">Jumlah</span>
              <p>: {order.quantity}</p>
              <span className="text-muted-foreground">Total</span>
              <p>: {order.total}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default AdminOrdersPage
