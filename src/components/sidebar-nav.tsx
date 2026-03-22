"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, BookOpen, ClipboardList, FlaskConical,
  BarChart2, HelpCircle, User, MessageCircleQuestion, FileText, Menu, X,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Courses", href: "/dashboard/courses", icon: BookOpen },
  { label: "Assignments", href: "/dashboard/assignments", icon: ClipboardList },
  { label: "Mock Tests", href: "/dashboard/mock-tests", icon: FlaskConical },
  { label: "Performance", href: "/dashboard/performance", icon: BarChart2 },
  { label: "Ask a Doubt", href: "/dashboard/doubt", icon: MessageCircleQuestion },
  { label: "Notes", href: "/dashboard/notes", icon: FileText },
  { label: "Profile", href: "/dashboard/profile", icon: User },
  { label: "Help", href: "/dashboard/help", icon: HelpCircle },
];

function NavContent({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col gap-1 p-4">
      <div className="flex items-center gap-2 px-3 py-4 mb-2">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <BookOpen className="h-4 w-4 text-white" />
        </div>
        <span className="font-bold text-lg">The Asian Kid</span>
      </div>
      {navItems.map(({ label, href, icon: Icon }) => {
        const active = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
        return (
          <Link
            key={href}
            href={href}
            onClick={onClose}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
              active
                ? "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
            )}
          >
            <Icon className="h-4 w-4 flex-shrink-0" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

export function DesktopSidebar() {
  return (
    <aside className="hidden md:flex flex-col w-60 border-r bg-white dark:bg-gray-900 min-h-screen">
      <NavContent />
    </aside>
  );
}

export function MobileSidebar() {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800">
        <Menu className="h-5 w-5" />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-60">
        <NavContent onClose={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  );
}
