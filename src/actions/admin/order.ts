"use server";

import { db } from "@/lib/db";
import { OrderStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const updateOrderStatus = async (formData: FormData) => {
  const id = formData.get("id") as string;
  const status = formData.get("status") as OrderStatus;

  if (!id || !status) {
    return {
      success: false,
      message: "Terjadi kesalahan",
    };
  }

  try {
    await db.order.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });

    revalidatePath("/admin/dashboard/orders");

    return {
      success: true,
      message: "Berhasil mengubah status order",
    };
  } catch (error) {
    return {
      success: false,
      message: "Terjadi kesalahan",
    };
  }
};
