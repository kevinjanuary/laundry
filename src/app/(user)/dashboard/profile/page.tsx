import { LogoutButton } from "@/components/logout-button"
import { getCurrentUser } from "@/lib/session"
import {
  Banknote,
  ChevronRight,
  Contact,
  Lock,
  LogOut,
  ShieldAlert,
  UserRound,
} from "lucide-react"
import { signOut } from "next-auth/react"
import { redirect } from "next/navigation"

const UserProfilePage = async () => {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/masuk")
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-center">
        <span className="w-20 aspect-square bg-muted rounded-full"></span>
      </div>

      <div className="text-sm">
        <h2 className="bg-muted font-medium py-2">Data Pribadi</h2>
        <div className="p-4 flex flex-col gap-4">
          <div className="flex gap-2 items-center">
            <UserRound width={24} height={24} />
            <span>Ubah Profile</span>
            <ChevronRight width={20} height={20} className="ml-auto" />
          </div>
          <div className="flex gap-2 items-center">
            <Lock width={24} height={24} />
            <span>Ubah Password</span>
            <ChevronRight width={20} height={20} className="ml-auto" />
          </div>
          <div className="flex gap-2 items-center">
            <Banknote width={24} height={24} />
            <span>Daftar Transaksi</span>
            <ChevronRight width={20} height={20} className="ml-auto" />
          </div>
        </div>
      </div>

      <div className="text-sm">
        <h2 className="bg-muted font-medium py-2">Bantuan</h2>
        <div className="p-4 flex flex-col gap-4">
          <div className="flex gap-2 items-center">
            <ShieldAlert width={24} height={24} />
            <span>Kebijakan Privasi</span>
            <ChevronRight width={20} height={20} className="ml-auto" />
          </div>
          <div className="flex gap-2 items-center">
            <Contact width={24} height={24} />
            <span>Hubungi Kami</span>
            <ChevronRight width={20} height={20} className="ml-auto" />
          </div>
          <LogoutButton />
        </div>
      </div>
    </div>
  )
}

export default UserProfilePage
