import { deleteProduct } from "@/actions/product"
import FormAddProduct from "@/components/form-add-product"
import { Button } from "@/components/ui/button"
import { db } from "@/lib/db"
import { formatRupiah } from "@/lib/rupiah"
import { getCurrentUser } from "@/lib/session"
import { UserRole } from "@prisma/client"
import Image from "next/image"
import { notFound, redirect } from "next/navigation"

const AdminProductsPage = async () => {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/masuk")
  }
  if (user.role !== UserRole.ADMIN) {
    notFound()
  }

  const products = await db.product.findMany()

  return (
    <>
      <h1>Daftar produk</h1>
      <FormAddProduct />

      <div className="flex flex-col space-y-4">
        {products.map((product) => (
          <div key={product.id} className="flex gap-4 text-sm">
            <Image
              src={product.image}
              alt={product.name}
              width={100}
              height={100}
              className="aspect-square object-contain"
            />
            <div className="flex flex-col gap-2">
              <div className="w-full grid grid-cols-2">
                <span className="text-muted-foreground">Nama</span>
                <h2>: {product.name}</h2>
                <span className="text-muted-foreground">Deskripsi</span>
                <p>: {product.description}</p>
                <span className="text-muted-foreground">Estimasi</span>
                <p>: {product.estimated}</p>
                <span className="text-muted-foreground">Price</span>
                <p>: {formatRupiah(product.price)}</p>
              </div>

              <form action={deleteProduct}>
                <input type="hidden" name="id" value={product.id} />
                <Button variant="destructive" size="sm">
                  Hapus produk
                </Button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default AdminProductsPage
