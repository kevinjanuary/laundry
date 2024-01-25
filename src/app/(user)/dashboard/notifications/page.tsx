import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import Image from "next/image"
import { redirect } from "next/navigation"

const UserNotificationPage = async () => {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/masuk")
  }

  const order = await db.order.findMany({
    where: {
      userId: user.id,
    },
    include: {
      product: true,
    },
  })

  return (
    <div>
      <h1 className="font-medium text-center p-4 mb-4 border-b">
        Notification
      </h1>
      <div className="flex flex-col space-y-4">
        {order.map((item) => (
          <div key={item.id} className="flex gap-2 items-center">
            <Image
              src={item.product.image}
              alt={item.product.name}
              width={64}
              height={64}
              className="w-16 h-16 object-cover"
            />
            <div className="flex w-full gap-4 p-3 border-2 rounded-xl text-sm">
              <div className="flex flex-col text-muted-foreground">
                <span>Jenis Laundry</span>
                <span>Jangka Waktu</span>
                <span>Status</span>
              </div>
              <div className="flex flex-col">
                <span>: {item.product.name}</span>
                <span>: {item.product.estimated}</span>
                <span>
                  :{" "}
                  {item.status === "DIPROSES"
                    ? "Diproses"
                    : item.status === "MENERIMA"
                    ? "Menerima"
                    : item.status === "SIAP_DIAMBIL"
                    ? "Siap diambil"
                    : "Selesai"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserNotificationPage
