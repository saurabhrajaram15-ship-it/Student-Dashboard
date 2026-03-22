import { auth } from "@/lib/auth";
import { mockCourses, mockAssignments, mockTests, mockAttendance, mockPerformance, mockNotifications } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, ClipboardList, FlaskConical, TrendingUp, Bell, Calendar } from "lucide-react";
import Link from "next/link";
import { PerformanceChart } from "@/components/charts/performance-chart";

export default async function DashboardPage() {
  const session = await auth();
  const user = session?.user;

  const pendingAssignments = mockAssignments.filter(a => a.status === "pending" || a.status === "overdue").length;
  const availableTests = mockTests.filter(t => t.status === "available").length;
  const unreadNotifications = mockNotifications.filter(n => !n.read).length;

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Welcome Banner */}
      <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-4 sm:p-6 text-white">
        <p className="text-blue-100 text-sm font-medium mb-1">{greeting} 👋</p>
        <h1 className="text-2xl font-bold mb-1">{user?.name ?? "Student"}</h1>
        <p className="text-blue-100 text-sm">Keep up the great work! You have {pendingAssignments} pending assignment{pendingAssignments !== 1 ? "s" : ""} and {availableTests} available test{availableTests !== 1 ? "s" : ""}.</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={<BookOpen className="h-5 w-5 text-blue-600" />} label="Courses" value={mockCourses.length} bg="bg-blue-50 dark:bg-blue-950" href="/dashboard/courses" />
        <StatCard icon={<ClipboardList className="h-5 w-5 text-amber-600" />} label="Pending" value={pendingAssignments} bg="bg-amber-50 dark:bg-amber-950" href="/dashboard/assignments" />
        <StatCard icon={<FlaskConical className="h-5 w-5 text-purple-600" />} label="Tests Ready" value={availableTests} bg="bg-purple-50 dark:bg-purple-950" href="/dashboard/mock-tests" />
        <StatCard icon={<Bell className="h-5 w-5 text-red-600" />} label="Notifications" value={unreadNotifications} bg="bg-red-50 dark:bg-red-950" href="/dashboard/notifications" />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Performance Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <TrendingUp className="h-4 w-4" /> Performance Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <PerformanceChart data={mockPerformance} />
          </CardContent>
        </Card>

        {/* Upcoming assignments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Calendar className="h-4 w-4" /> Upcoming Assignments
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockAssignments
              .filter(a => a.status === "pending" || a.status === "overdue")
              .slice(0, 4)
              .map(a => (
                <div key={a.id} className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{a.title}</p>
                    <p className="text-xs text-gray-500">{a.subject} · Due {a.dueDate}</p>
                  </div>
                  <Badge variant={a.status === "overdue" ? "destructive" : "outline"} className="shrink-0 text-xs">
                    {a.status}
                  </Badge>
                </div>
              ))}
            <Link href="/dashboard/assignments" className="text-xs text-blue-600 hover:underline font-medium block pt-1">
              View all assignments →
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Course Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <BookOpen className="h-4 w-4" /> Course Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockCourses.map(course => (
            <Link key={course.id} href={`/dashboard/courses/${course.id}`}>
              <div className="p-3 rounded-lg border hover:border-blue-300 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 transition-colors cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold">{course.subject}</p>
                  <span className="text-xs font-bold text-blue-600">{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="h-1.5" />
                <p className="text-xs text-gray-500 mt-1">{course.completedTopics}/{course.totalTopics} topics · {course.teacher}</p>
              </div>
            </Link>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({ icon, label, value, bg, href }: { icon: React.ReactNode; label: string; value: number; bg: string; href: string }) {
  return (
    <Link href={href}>
      <Card className="hover:shadow-md transition-shadow cursor-pointer">
        <CardContent className="p-4">
          <div className={`inline-flex p-2 rounded-lg ${bg} mb-2`}>{icon}</div>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-xs text-gray-500 font-medium">{label}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
