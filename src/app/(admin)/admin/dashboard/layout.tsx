import AdminMenu from "@/components/admin-menu"

const AdminDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex flex-col">
      {children}
      <AdminMenu />
    </div>
  )
}

export default AdminDashboardLayout
