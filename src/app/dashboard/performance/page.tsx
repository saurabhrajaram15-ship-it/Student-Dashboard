import { mockPerformance, mockAttendance, mockCourses, mockTests } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PerformanceChart } from "@/components/charts/performance-chart";
import { ActivityRadarChart } from "@/components/charts/radar-chart";
import { TrendingUp, Users, CheckCircle, Award } from "lucide-react";

export default function PerformancePage() {
  const avgScore = Math.round(mockPerformance.reduce((s, p) => s + p.score, 0) / mockPerformance.length);
  const avgHomework = Math.round(mockPerformance.reduce((s, p) => s + p.homework, 0) / mockPerformance.length);
  const completedTests = mockTests.filter(t => t.status === "completed").length;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Performance</h1>
        <p className="text-gray-500 text-sm mt-1">Track your academic progress</p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard icon={<TrendingUp className="h-5 w-5 text-blue-600" />} label="Avg Score" value={`${avgScore}%`} bg="bg-blue-50 dark:bg-blue-950" />
        <KpiCard icon={<Users className="h-5 w-5 text-green-600" />} label="Attendance" value={`${mockAttendance.percentage}%`} bg="bg-green-50 dark:bg-green-950" />
        <KpiCard icon={<CheckCircle className="h-5 w-5 text-amber-600" />} label="Homework" value={`${avgHomework}%`} bg="bg-amber-50 dark:bg-amber-950" />
        <KpiCard icon={<Award className="h-5 w-5 text-purple-600" />} label="Tests Done" value={`${completedTests}`} bg="bg-purple-50 dark:bg-purple-950" />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Performance trend */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Score Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <PerformanceChart data={mockPerformance} />
          </CardContent>
        </Card>

        {/* Radar chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Overall Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ActivityRadarChart />
          </CardContent>
        </Card>
      </div>

      {/* Attendance breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Attendance Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="grid sm:grid-cols-4 gap-4">
          {[
            { label: "Total Days", value: mockAttendance.totalDays, color: "text-gray-600" },
            { label: "Present", value: mockAttendance.present, color: "text-green-600" },
            { label: "Absent", value: mockAttendance.absent, color: "text-red-600" },
            { label: "Late", value: mockAttendance.late, color: "text-amber-600" },
          ].map(({ label, value, color }) => (
            <div key={label} className="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
              <p className={`text-3xl font-bold ${color}`}>{value}</p>
              <p className="text-xs text-gray-500 mt-1">{label}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Subject progress */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Subject Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockCourses.map(c => (
            <div key={c.id}>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="font-medium">{c.subject}</span>
                <span className="text-gray-500">{c.progress}%</span>
              </div>
              <Progress value={c.progress} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function KpiCard({ icon, label, value, bg }: { icon: React.ReactNode; label: string; value: string; bg: string }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className={`inline-flex p-2 rounded-lg ${bg} mb-2`}>{icon}</div>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-xs text-gray-500 font-medium">{label}</p>
      </CardContent>
    </Card>
  );
}
