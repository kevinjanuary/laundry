import { Button } from "@/components/ui/button"
import { getSession } from "@/lib/session"
import Link from "next/link"
import { redirect } from "next/navigation"

const RootPageForUser = async () => {
  const session = await getSession()

  if (session) {
    redirect("/dashboard")
  }

  return (
    <div className="flex flex-col items-center text-center">
      <span className="text-lg font-medium">Energy</span>
      <span className="text-lg font-medium">Clean & Wash</span>
      <div className="max-w-40 flex space-x-4 mt-4">
        <Link href="/masuk">
          <Button variant="outline">Masuk</Button>
        </Link>
        <Link href="/daftar">
          <Button>Daftar</Button>
        </Link>
      </div>
    </div>
  )
}

export default RootPageForUser
