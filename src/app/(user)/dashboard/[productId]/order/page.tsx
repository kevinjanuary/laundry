import FormOrder from "@/components/form-order"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { redirect } from "next/navigation"

const UserOrderPage = async ({
  params,
}: {
  params: {
    productId: string
  }
}) => {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/masuk")
  }

  const product = await db.product.findUnique({
    where: {
      id: params.productId,
    },
  })

  if (!product) {
    return <div>Produk tidak ditemukan</div>
  }

  return <FormOrder product={product} />
}

export default UserOrderPage
