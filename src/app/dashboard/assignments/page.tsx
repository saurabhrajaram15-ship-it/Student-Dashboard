import { mockAssignments } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClipboardList, Calendar, ChevronRight } from "lucide-react";
import Link from "next/link";

const statusColors: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  pending: "outline",
  submitted: "secondary",
  graded: "default",
  overdue: "destructive",
};

export default function AssignmentsPage() {
  const byStatus = {
    all: mockAssignments,
    pending: mockAssignments.filter(a => a.status === "pending"),
    submitted: mockAssignments.filter(a => a.status === "submitted"),
    graded: mockAssignments.filter(a => a.status === "graded"),
    overdue: mockAssignments.filter(a => a.status === "overdue"),
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Assignments</h1>
        <p className="text-gray-500 text-sm mt-1">Track and submit your homework</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Pending", count: byStatus.pending.length, color: "text-amber-600" },
          { label: "Submitted", count: byStatus.submitted.length, color: "text-blue-600" },
          { label: "Graded", count: byStatus.graded.length, color: "text-green-600" },
          { label: "Overdue", count: byStatus.overdue.length, color: "text-red-600" },
        ].map(({ label, count, color }) => (
          <Card key={label}>
            <CardContent className="p-4 text-center">
              <p className={`text-2xl font-bold ${color}`}>{count}</p>
              <p className="text-xs text-gray-500 mt-0.5">{label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All ({byStatus.all.length})</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="overdue">Overdue</TabsTrigger>
          <TabsTrigger value="graded">Graded</TabsTrigger>
        </TabsList>

        {(["all", "pending", "overdue", "graded"] as const).map(tab => (
          <TabsContent key={tab} value={tab} className="space-y-3 mt-4">
            {byStatus[tab].length === 0 && (
              <p className="text-sm text-gray-500 text-center py-8">No {tab} assignments.</p>
            )}
            {byStatus[tab].map(a => (
              <Link key={a.id} href={`/dashboard/assignments/${a.id}`}>
                <Card className="hover:shadow-sm transition-shadow cursor-pointer">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-medium text-sm">{a.title}</p>
                        <Badge variant={statusColors[a.status]} className="text-xs">{a.status}</Badge>
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-gray-500">{a.subject}</span>
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <Calendar className="h-3 w-3" /> {a.dueDate}
                        </span>
                        {a.grade !== undefined && (
                          <span className="text-xs font-semibold text-green-600">{a.grade}/{a.maxGrade}</span>
                        )}
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400 shrink-0" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
