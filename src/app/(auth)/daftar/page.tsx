import FormDaftar from "@/components/form-daftar"
import { ArrowLeftIcon } from "lucide-react"
import Link from "next/link"

const DaftarPage = () => {
  return (
    <div className="p-6 space-y-4">
      <Link href="/" className="flex gap-4">
        <ArrowLeftIcon className="w-6 h-6" />
        <span>Back</span>
      </Link>

      <h1 className="font-medium mt-4">Daftar</h1>

      <FormDaftar />

      <div className="text-center text-sm pt-4">
        <span className="text-muted-foreground">Sudah punya akun? </span>
        <Link href="/masuk">Masuk</Link>
      </div>
    </div>
  )
}

export default DaftarPage
