import { mockCourses, mockAssignments, mockTests } from "@/lib/mock-data";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, ClipboardList, FlaskConical, FileText } from "lucide-react";
import Link from "next/link";

export default async function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const course = mockCourses.find(c => c.id === id);
  if (!course) notFound();

  const courseAssignments = mockAssignments.filter(a => a.subject === course.subject);
  const courseTests = mockTests.filter(t => t.subject === course.subject);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Link href="/dashboard/courses" className="hover:text-blue-600">Courses</Link>
        <span>/</span>
        <span className="text-gray-900 dark:text-white font-medium">{course.subject}</span>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-2xl font-bold">{course.subject}</h1>
              <p className="text-gray-500 mt-1">Taught by {course.teacher}</p>
            </div>
            <Badge variant="outline" className="text-sm">In Progress</Badge>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-500">{course.completedTopics} of {course.totalTopics} topics completed</span>
              <span className="font-semibold">{course.progress}%</span>
            </div>
            <Progress value={course.progress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="assignments">
        <TabsList className="w-full md:w-auto">
          <TabsTrigger value="assignments"><ClipboardList className="h-3.5 w-3.5 mr-1.5" />Assignments</TabsTrigger>
          <TabsTrigger value="tests"><FlaskConical className="h-3.5 w-3.5 mr-1.5" />Mock Tests</TabsTrigger>
          <TabsTrigger value="notes"><FileText className="h-3.5 w-3.5 mr-1.5" />Notes</TabsTrigger>
        </TabsList>

        <TabsContent value="assignments" className="space-y-3 mt-4">
          {courseAssignments.length === 0 && <p className="text-sm text-gray-500">No assignments for this course yet.</p>}
          {courseAssignments.map(a => (
            <Link key={a.id} href={`/dashboard/assignments/${a.id}`}>
              <Card className="hover:shadow-sm transition-shadow cursor-pointer">
                <CardContent className="p-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-medium text-sm">{a.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">Due: {a.dueDate}</p>
                  </div>
                  <Badge variant={a.status === "overdue" ? "destructive" : a.status === "graded" ? "default" : "outline"}>
                    {a.status}
                  </Badge>
                </CardContent>
              </Card>
            </Link>
          ))}
        </TabsContent>

        <TabsContent value="tests" className="space-y-3 mt-4">
          {courseTests.length === 0 && <p className="text-sm text-gray-500">No mock tests for this course yet.</p>}
          {courseTests.map(t => (
            <Link key={t.id} href={`/dashboard/mock-tests/${t.id}`}>
              <Card className="hover:shadow-sm transition-shadow cursor-pointer">
                <CardContent className="p-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-medium text-sm">{t.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{t.duration} min · {t.totalQuestions} questions</p>
                  </div>
                  <Badge variant={t.status === "available" ? "default" : t.status === "completed" ? "secondary" : "outline"}>
                    {t.status}
                  </Badge>
                </CardContent>
              </Card>
            </Link>
          ))}
        </TabsContent>

        <TabsContent value="notes" className="mt-4">
          <Card>
            <CardContent className="p-6 text-center text-gray-500">
              <FileText className="h-10 w-10 mx-auto mb-2 text-gray-300" />
              <p className="text-sm">Study notes will appear here once uploaded by your teacher.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
