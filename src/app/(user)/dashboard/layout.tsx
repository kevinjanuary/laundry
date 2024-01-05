import UserMenu from "@/components/user-menu"

const UserDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex flex-col">
      {children}
      <UserMenu />
    </div>
  )
}

export default UserDashboardLayout
