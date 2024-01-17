"use client"

import { Input } from "@/components/ui/input"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FormAlert } from "./form-alert"
import { FormButton } from "./form-button"

const FormMasuk = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [state, setState] = useState({ success: false, message: "" })
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    signIn("credentials", {
      email,
      password,
      redirect: false,
    }).then((res) => {
      if (res?.ok) {
        setState({ success: true, message: "Berhasil masuk" })
        router.push("/dashboard")
      } else {
        setState({ success: false, message: res?.error || "Terjadi kesalahan" })
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <FormAlert success={state?.success} message={state?.message} />
      <Input
        type="email"
        name="email"
        id="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        name="password"
        id="password"
        placeholder="Kata sandi"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <FormButton text="Masuk" />
    </form>
  )
}

export default FormMasuk
