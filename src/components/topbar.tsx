"use client";
import { useSession, signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, Sun, Moon, LogOut, User } from "lucide-react";
import { MobileSidebar } from "@/components/sidebar-nav";

export function Topbar() {
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const user = session?.user;
  const initials = user?.name?.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase() ?? "S";

  return (
    <header className="h-14 border-b bg-white dark:bg-gray-900 flex items-center justify-between px-3 sm:px-4 gap-2 sticky top-0 z-40">
      <div className="flex items-center gap-2">
        <MobileSidebar />
        <span className="font-semibold text-sm text-gray-500 dark:text-gray-400 hidden sm:block">
          Student Portal
        </span>
      </div>

      <div className="flex items-center gap-1 sm:gap-2">
        {/* Theme toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 sm:h-9 sm:w-9"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>

        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 sm:h-9 sm:w-9 relative"
          onClick={() => router.push("/dashboard/notifications")}
        >
          <Bell className="h-4 w-4" />
          <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 text-[10px] flex items-center justify-center bg-red-500 border-0">
            2
          </Badge>
        </Button>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1.5 sm:gap-2 px-1.5 sm:px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors outline-none">
            <Avatar className="h-7 w-7">
              <AvatarImage src={user?.image ?? ""} />
              <AvatarFallback className="text-xs bg-blue-100 text-blue-700 font-semibold">{initials}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium hidden sm:block max-w-[100px] truncate">
              {user?.name ?? "Student"}
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem
              onClick={() => router.push("/dashboard/profile")}
              className="flex items-center gap-2 cursor-pointer"
            >
              <User className="h-4 w-4" /> Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="text-red-600 focus:text-red-600 flex items-center gap-2 cursor-pointer"
            >
              <LogOut className="h-4 w-4" /> Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
