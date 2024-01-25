import { Badge } from "@/components/ui/badge"
import { db } from "@/lib/db"
import { formatRupiah } from "@/lib/rupiah"
import { getCurrentUser } from "@/lib/session"
import { OrderStatus } from "@prisma/client"
import { redirect } from "next/navigation"

const UserOrderPage = async ({
  params,
}: {
  params: {
    orderId: string
  }
}) => {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/masuk")
  }

  const order = await db.order.findUnique({
    where: {
      id: params.orderId,
      userId: user.id,
    },
    include: {
      product: true,
    },
  })

  if (!order) {
    return <div>Pesanan tidak ditemukan</div>
  }

  return (
    <div className="flex flex-col space-y-4">
      <h1 className="p-4 text-center border-b font-medium">Rincian pesanan</h1>
      <div className="flex flex-col border-b space-y-2 pb-4">
        <h2 className="font-medium">Status Pesanan</h2>
        <div className="relative flex flex-col justify-center">
          <div className="h-[1px] w-full bg-muted absolute"></div>
          <div className="flex justify-between z-10">
            <Badge>Menerima</Badge>
            <Badge
              variant={
                order.status === OrderStatus.DIPROSES ||
                order.status === OrderStatus.SIAP_DIAMBIL ||
                order.status === OrderStatus.SELESAI
                  ? "default"
                  : "outline"
              }
            >
              Diproses
            </Badge>
            <Badge
              variant={
                order.status === OrderStatus.SIAP_DIAMBIL ||
                order.status === OrderStatus.SELESAI
                  ? "default"
                  : "outline"
              }
            >
              Siap Ambil
            </Badge>
            <Badge
              variant={
                order.status === OrderStatus.SELESAI ? "default" : "outline"
              }
            >
              Selesai
            </Badge>
          </div>
        </div>
      </div>

      <div className="flex flex-col border-b space-y-2 pb-4">
        <h2 className="font-medium">Rincian Pesanan</h2>
        <div className="flex flex-wrap justify-between gap-2 text-sm">
          <div className="flex flex-col">
            <span className="font-medium">Layanan</span>
            <span>{order.product.name}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-medium">Kuantitas</span>
            <span>
              {order.quantity} kg x {formatRupiah(order.price)}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-medium">Total</span>
            <span>{formatRupiah(order.total)}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between font-medium border-b pb-4">
        <span>Total</span>
        <span>{formatRupiah(order.total)}</span>
      </div>
    </div>
  )
}

export default UserOrderPage
