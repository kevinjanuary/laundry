"use server"

import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { redirect } from "next/navigation"

export const createOrder = async (prevState: unknown, formData: FormData) => {
  const quantity = Number(formData.get("quantity")?.toString().trim())
  const note = formData.get("note")?.toString().trim()
  const productId = formData.get("productId")?.toString().trim()
  try {
    if (isNaN(quantity)) {
      throw "Jumlah harus berupa angka"
    }
    if (quantity < 1) {
      throw "Jumlah harus lebih dari 0"
    }

    const user = await getCurrentUser()
    if (!user) {
      throw "Anda harus login terlebih dahulu."
    }

    const product = await db.product.findUnique({
      where: {
        id: productId,
      },
    })
    if (!product) {
      throw "Terjadi kesalahan, mohon coba refresh halaman."
    }

    const total = product.price * quantity

    try {
      const order = await db.order.create({
        data: {
          price: product.price,
          quantity,
          total,
          note,
          userId: user.id,
          productId: product.id,
        },
      })

      return {
        success: true,
        message: "Berhasil membuat pesanan",
        link: `/dashboard/order/${order.id}`,
      }
    } catch (error) {
      throw "Terjadi kesalahan, mohon coba lagi."
    }
  } catch (error) {
    return {
      success: false,
      message: (error as string) || "Terjadi kesalahan",
    }
  }
}
