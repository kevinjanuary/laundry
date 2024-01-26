import AdminMenu from "@/components/admin-menu"
import { LogoutButton } from "@/components/logout-button"

const AdminDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between gap-2 h-10 items-center px-6 py-8 border-b">
        <h1>Admin Dashboard</h1>
        <LogoutButton hideRightIcon />
      </div>
      <div className="p-6 bg-white overflow-scroll">{children}</div>
      <AdminMenu />
    </div>
  )
}

export default AdminDashboardLayout
