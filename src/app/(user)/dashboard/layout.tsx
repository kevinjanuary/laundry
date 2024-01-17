import UserMenu from "@/components/user-menu";

const UserDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex flex-col">
      <div className="p-6 overflow-scroll">{children}</div>
      <UserMenu />
    </div>
  );
};

export default UserDashboardLayout;
