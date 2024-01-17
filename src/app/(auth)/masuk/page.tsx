import FormMasuk from "@/components/form-masuk"
import { ArrowLeftIcon } from "@radix-ui/react-icons"
import Link from "next/link"

const MasukPage = () => {
  return (
    <div className="space-y-4 h-full flex flex-col p-6">
      <Link href="/" className="flex gap-4">
        <ArrowLeftIcon className="w-6 h-6" />
        <span>Back</span>
      </Link>

      <div>
        <h1 className="font-medium text-lg">Masuk</h1>
        <p className="text-muted-foreground text-sm">
          Masuk ke akun Anda untuk mengakses semua fitur dari Energy Clean &
          Wash
        </p>
      </div>

      <FormMasuk />

      <div className="text-center text-sm pt-4">
        <span className="text-muted-foreground">Belum punya akun? </span>
        <Link href="/daftar">Daftar</Link>
      </div>
    </div>
  )
}

export default MasukPage
