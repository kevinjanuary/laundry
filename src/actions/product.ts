"use server"

import { db } from "@/lib/db"
import { mkdir, writeFile } from "fs/promises"
import { revalidatePath } from "next/cache"
import { join } from "path"

export const addProduct = async (prevState: unknown, formData: FormData) => {
  const name = formData.get("name")?.toString().trim()
  const description = formData.get("description")?.toString().trim()
  const estimated = formData.get("estimated")?.toString().trim()
  const price = formData.get("price")?.toString().trim()
  const file: File | null = formData.get("file") as unknown as File

  try {
    if (!name || !estimated || !price || !file) {
      throw "Semua kolom harus diisi"
    }

    if (name.length < 1) {
      throw "Nama harus diisi"
    }

    if (estimated.length < 1) {
      throw "Estimasi harus diisi"
    }

    if (isNaN(Number(price))) {
      throw "Harga harus berupa angka"
    }

    if (Number(price) < 1) {
      throw "Harga harus lebih dari 0"
    }

    try {
      const product = await db.product.create({
        data: {
          name,
          description,
          estimated,
          price: Number(price),
          image: "",
        },
      })
      formData.append("id", product.id.toString())
      await uploadImage(formData)
      await db.product.update({
        where: {
          id: product.id,
        },
        data: {
          image: `/uploads/${product.id}.png`,
        },
      })
    } catch (error) {
      throw "Terjadi kesalahan, mohon coba lagi."
    }

    revalidatePath("/admin/dashboard/products")

    return {
      success: true,
      message: "Berhasil menambahkan produk.",
    }
  } catch (error) {
    return {
      success: false,
      message: (error as string) || "Terjadi kesalahan",
    }
  }
}

export const deleteProduct = async (formData: FormData) => {
  const id = formData.get("id")?.toString().trim()

  if (!id) {
    throw "Terjadi kesalahan, mohon refresh halaman."
  }

  try {
    await db.product.delete({
      where: {
        id
      }
    })

    revalidatePath("/admin/dashboard/products")

    return {
      success: true,
      message: "Berhasil menghapus produk"
    }
  } catch (error) {
    return {
      success: false,
      message: (error as string) || "Terjadi kesalahan",
    }
  }
}

export const uploadImage = async (formData: FormData) => {
  const file: File | null = formData.get("file") as unknown as File
  if (!file) {
    throw new Error("No file")
  }

  const productId = formData.get("id")?.toString().trim()

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const dir = join(process.cwd(), "public", "uploads")
  await mkdir(dir, { recursive: true })

  const path = join(dir, `${productId}.png`)
  await writeFile(path, buffer)
}
