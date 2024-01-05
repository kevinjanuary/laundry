"use client"

import { daftar } from "@/actions/auth"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useFormState } from "react-dom"
import { FormAlert } from "./form-alert"
import { FormButton } from "./form-button"

const FormDaftar = () => {
  const [state, formAction] = useFormState(daftar, null)

  return (
    <form action={formAction}>
      <FormAlert success={state?.success} message={state?.message} />
      <Label htmlFor="nama">Nama</Label>
      <Input type="nama" name="nama" id="nama" placeholder="Nama" />
      <Label htmlFor="email">Email</Label>
      <Input type="email" name="email" id="email" placeholder="Email" />
      <Label htmlFor="password">Kata sandi</Label>
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
