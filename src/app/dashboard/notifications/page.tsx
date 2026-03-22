"use client";
import { useState } from "react";
import { mockNotifications } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, CheckCheck, Info, AlertTriangle, CheckCircle } from "lucide-react";
import type { Notification } from "@/lib/api";

const typeIcon: Record<string, React.ReactNode> = {
  info: <Info className="h-4 w-4 text-blue-600" />,
  warning: <AlertTriangle className="h-4 w-4 text-amber-600" />,
  success: <CheckCircle className="h-4 w-4 text-green-600" />,
};
const typeBg: Record<string, string> = {
  info: "bg-blue-50 dark:bg-blue-950",
  warning: "bg-amber-50 dark:bg-amber-950",
  success: "bg-green-50 dark:bg-green-950",
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  function markAllRead() {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }
  function markRead(id: string) {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  }

  const unread = notifications.filter(n => !n.read).length;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Notifications</h1>
          <p className="text-gray-500 text-sm mt-1">{unread} unread</p>
        </div>
        {unread > 0 && (
          <Button variant="outline" size="sm" onClick={markAllRead}>
            <CheckCheck className="h-4 w-4 mr-1.5" /> Mark all read
          </Button>
        )}
      </div>

      {notifications.length === 0 && (
        <Card>
          <CardContent className="p-10 text-center">
            <Bell className="h-10 w-10 text-gray-300 mx-auto mb-2" />
            <p className="text-gray-500">No notifications yet</p>
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        {notifications.map(n => (
          <Card
            key={n.id}
            className={`transition-all cursor-pointer ${!n.read ? "border-blue-200 dark:border-blue-800 shadow-sm" : ""}`}
            onClick={() => markRead(n.id)}
          >
            <CardContent className="p-4 flex items-start gap-3">
              <div className={`p-2 rounded-lg shrink-0 ${typeBg[n.type]}`}>
                {typeIcon[n.type]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm font-semibold">{n.title}</p>
                  {!n.read && <Badge className="h-4 text-[10px] px-1.5 bg-blue-600">New</Badge>}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">{n.message}</p>
                <p className="text-xs text-gray-400 mt-1">{new Date(n.createdAt).toLocaleDateString()}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
