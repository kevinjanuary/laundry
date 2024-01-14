"use client"

import { daftar } from "@/actions/auth"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { useFormState } from "react-dom"
import { FormAlert } from "./form-alert"
import { FormButton } from "./form-button"

const FormDaftar = () => {
  const [state, formAction] = useFormState(daftar, null)
  const router = useRouter()

  if (state?.success === true) {
    router.push("/dashboard")
  }
  return (
    <form action={formAction} className="space-y-2">
      <FormAlert success={state?.success} message={state?.message} />
      <Input type="nama" name="nama" id="nama" placeholder="Nama" />
      <Input type="email" name="email" id="email" placeholder="Email" />
      <Input
        type="password"
        name="password"
        id="password"
        placeholder="Kata sandi"
      />
      <FormButton text="Daftar" />
    </form>
  )
}

export default FormDaftar
