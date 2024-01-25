"use client"

import { createOrder } from "@/actions/order"
import { formatRupiah } from "@/lib/rupiah"
import { Product } from "@prisma/client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useFormState } from "react-dom"
import { FormAlert } from "./form-alert"
import { FormButton } from "./form-button"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

const FormOrder = ({ product }: { product: Product }) => {
  const [confirm, setConfirm] = useState(false)
  const [quantity, setQuantity] = useState("")
  const [note, setNote] = useState("")
  const [error, setError] = useState("")

  const [state, formAction] = useFormState(createOrder, null)
  const router = useRouter()

  if (state?.success && state.link) {
    router.push(state.link)
  }

  return (
    <div className="flex flex-col">
      {!confirm ? (
        <>
          <div className="grid grid-cols-2 gap-2 text-sm p-4">
            <div className="flex flex-col">
              <span>Jenis Paket Layanan</span>
              <span className="font-medium">{product.name}</span>
            </div>
            <div className="flex flex-col">
              <span>Estimasi Pengerjaan</span>
              <span className="font-medium">{product.estimated}</span>
            </div>
            <div className="flex flex-col">
              <span>Harga per kg</span>
              <span className="font-medium">
                {formatRupiah(product.price)} / kg
              </span>
            </div>
          </div>

          <div className="border-t p-4 space-y-4">
            <h3 className="text-center font-medium">Masukkan Kuantitas</h3>
            <Input
              type="number"
              placeholder="Jumlah"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Catatan (jika ada)"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            <FormAlert message={error} />
            <Button
              onClick={() => {
                if (quantity === "" || parseInt(quantity) <= 0) {
                  setError("Jumlah tidak boleh kosong")
                  return
                }
                setError("")
                setConfirm(true)
              }}
            >
              Buat Pesanan
            </Button>
          </div>
        </>
      ) : (
        <>
          <h3 className="text-center font-medium border-b p-4">Buat Pesanan</h3>
          <div className="p-4 m-4 border rounded-xl text-sm">
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col">
                <span>Jenis Paket Layanan</span>
                <span className="font-medium">{product.name}</span>
              </div>
              <div className="flex flex-col">
                <span>Estimasi Pengerjaan</span>
                <span className="font-medium">{product.estimated}</span>
              </div>
              <div className="flex flex-col">
                <span>Harga per kg</span>
                <span className="font-medium">
                  {formatRupiah(product.price)} / kg
                </span>
              </div>
            </div>
            <div className="flex flex-col p-2 bg-amber-400/40 rounded-md mt-4">
              <span>Catatan</span>
              <span className="font-medium">{note === "" ? "-" : note}</span>
            </div>
            <div className="flex justify-between mt-2 pt-2 border-t">
              <div className="flex flex-col">
                <span>Kuantitas</span>
                <span className="font-medium">{quantity} kg</span>
              </div>
              <div className="flex flex-col">
                <span>Total</span>
                <span className="font-medium">
                  {formatRupiah(parseInt(quantity) * product.price)}
                </span>
              </div>
            </div>
          </div>

          {state && (
            <div className="px-4">
              <FormAlert success={state.success} message={state?.message} />
            </div>
          )}

          <form action={formAction} className="p-4">
            <input type="hidden" name="productId" value={product.id}></input>
            <input type="hidden" name="quantity" value={quantity}></input>
            <input type="hidden" name="note" value={note}></input>
            <FormButton text="Pesan" />
          </form>
        </>
      )}
    </div>
  )
}

export default FormOrder
