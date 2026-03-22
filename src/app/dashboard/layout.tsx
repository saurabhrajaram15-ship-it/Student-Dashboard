import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { DesktopSidebar } from "@/components/sidebar-nav";
import { Topbar } from "@/components/topbar";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <DesktopSidebar />
      <div className="flex flex-col flex-1 min-w-0">
        <Topbar />
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
