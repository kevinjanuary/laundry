import { db } from "@/lib/db"
import { formatRupiah } from "@/lib/rupiah"
import { getCurrentUser } from "@/lib/session"
import { UserRole } from "@prisma/client"
import { notFound, redirect } from "next/navigation"
import { UpdateStatus } from "./_componets/update-status"
import { PrintStruk } from "./_componets/print-struk"

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
    <div className="space-y-4">
      <h2>Daftar pesanan</h2>
      <div className="flex flex-col space-y-2">
        {orders.map((order) => (
          <div
            key={order.id}
            className="flex flex-col border px-3 py-2 rounded-md text-sm"
          >
            <div className="flex">
              <span className="w-20 text-muted-foreground">Nama</span>
              <span>
                : {order.user.name} ({order.user.email})
              </span>
            </div>
            <div className="flex">
              <span className="w-20 text-muted-foreground">Produk</span>
              <span>: {order.product.name}</span>
            </div>
            <div className="flex">
              <span className="w-20 text-muted-foreground">Harga</span>
              <span>: {formatRupiah(order.price)}</span>
            </div>
            <div className="flex">
              <span className="w-20 text-muted-foreground">Jumlah</span>
              <span>: {order.quantity}</span>
            </div>
            <div className="flex">
              <span className="w-20 text-muted-foreground">Total</span>
              <span>: {formatRupiah(order.total)}</span>
            </div>
            <div className="flex">
              <span className="w-20 text-muted-foreground">Status</span>
              <span className="flex space-x-2">
                :
                <UpdateStatus id={order.id} status={order.status} />
              </span>
            </div>
            <div>
              <PrintStruk
                name={order.product.name}
                price={order.price}
                qty={order.quantity}
                total={order.total}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminOrdersPage
