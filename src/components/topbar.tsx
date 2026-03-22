"use client";
import { useSession, signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, Sun, Moon, LogOut, User, Settings } from "lucide-react";
import { MobileSidebar } from "@/components/sidebar-nav";
import Link from "next/link";

export function Topbar() {
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();
  const user = session?.user;
  const initials = user?.name?.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase() ?? "S";

  return (
    <header className="h-14 border-b bg-white dark:bg-gray-900 flex items-center justify-between px-4 gap-4 sticky top-0 z-40">
      <div className="flex items-center gap-2">
        <MobileSidebar />
        <span className="font-semibold text-sm text-gray-500 dark:text-gray-400 hidden sm:block">
          Student Portal
        </span>
      </div>

      <div className="flex items-center gap-2">
        {/* Theme toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>

        {/* Notifications */}
        <Link href="/dashboard/notifications">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 text-[10px] flex items-center justify-center bg-red-500">
              2
            </Badge>
          </Button>
        </Link>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 px-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <Avatar className="h-7 w-7">
              <AvatarImage src={user?.image ?? ""} />
              <AvatarFallback className="text-xs bg-blue-100 text-blue-700">{initials}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium hidden sm:block max-w-[120px] truncate">
              {user?.name ?? "Student"}
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => window.location.href = "/dashboard/profile"} className="flex items-center gap-2 cursor-pointer">
              <User className="h-4 w-4" /> Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="text-red-600 focus:text-red-600 flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" /> Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
