"use server"

import { db } from "@/lib/db"

export const daftar = async (prevState: unknown, formData: FormData) => {
  const name = formData.get("nama")?.toString().trim()
  const email = formData.get("email")?.toString().trim()
  const password = formData.get("password")?.toString().trim()

  try {
    if (!name || !email || !password) {
      throw "Semua kolom harus diisi"
    }

    if (password.length < 8) {
      throw "Password minimal 8 karakter"
    }

    if (!email.includes("@")) {
      throw "Email tidak valid"
    }

    if (name.length < 3) {
      throw "Nama minimal 3 karakter"
    }

    try {
      await db.user.create({
        data: {
          name,
          email,
          password,
        },
      })
    } catch (error) {
      throw "Email sudah terdaftar"
    }

    return {
      success: true,
      message: "Berhasil mendaftar",
    }
  } catch (error) {
    return {
      success: false,
      message: (error as string) || "Terjadi kesalahan",
    }
  }
}
