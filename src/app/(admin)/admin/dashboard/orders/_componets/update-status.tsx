"use client"

import { updateOrderStatus } from "@/actions/admin/order"
import { OrderStatus } from "@prisma/client"
import { useRef } from "react"

export const UpdateStatus = ({
  id,
  status,
}: {
  id: string
  status: OrderStatus
}) => {
  const form = useRef<HTMLFormElement>(null)

  return (
    <form action={updateOrderStatus} ref={form} className="border rounded-md">
      <input type="hidden" name="id" value={id} />
      <select
        name="status"
        id={`order-status-${id}`}
        defaultValue={status}
        onChange={() => {
          form.current?.requestSubmit()
        }}
      >
        <option value="MENERIMA">Menerima</option>
        <option value="DIPROSES">Diproses</option>
        <option value="SIAP_DIAMBIL">Siap diambil</option>
        <option value="SELESAI">Selesai</option>
      </select>
    </form>
  )
}
