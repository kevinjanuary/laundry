"use client"

import { useFormStatus } from "react-dom"
import { Button } from "./ui/button"

export const FormButton = ({ text = "Submit" }: { text?: string }) => {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? "Mohon tunggu..." : text}
    </Button>
  )
}
