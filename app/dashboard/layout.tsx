import { UserNav } from "@/components/nav/user-nav"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-gray-50">
      <UserNav />
      <main className="pt-20 px-20 max-w-[1400px] mx-auto mb-10">
        {children}
      </main>
    </div>
  )
} 