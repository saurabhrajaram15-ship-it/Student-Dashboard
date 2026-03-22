import { auth } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { mockCourses, mockAttendance } from "@/lib/mock-data";
import { Mail, User, BookOpen, Users } from "lucide-react";

export default async function ProfilePage() {
  const session = await auth();
  const user = session?.user;
  const initials = user?.name?.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase() ?? "S";

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">My Profile</h1>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-5">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user?.image ?? ""} />
              <AvatarFallback className="text-xl font-bold bg-blue-100 text-blue-700">{initials}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-bold">{user?.name ?? "Student"}</h2>
              <p className="text-gray-500 text-sm flex items-center gap-1.5 mt-1">
                <Mail className="h-3.5 w-3.5" />{user?.email ?? "student@school.com"}
              </p>
              <Badge className="mt-2" variant="secondary">Student</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <BookOpen className="h-6 w-6 text-blue-600 mx-auto mb-1" />
            <p className="text-2xl font-bold">{mockCourses.length}</p>
            <p className="text-xs text-gray-500">Enrolled Courses</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="h-6 w-6 text-green-600 mx-auto mb-1" />
            <p className="text-2xl font-bold">{mockAttendance.percentage}%</p>
            <p className="text-xs text-gray-500">Attendance</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <User className="h-6 w-6 text-purple-600 mx-auto mb-1" />
            <p className="text-2xl font-bold">Batch 1</p>
            <p className="text-xs text-gray-500">Current Batch</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Enrolled Subjects</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {mockCourses.map(c => (
            <Badge key={c.id} variant="outline">{c.subject}</Badge>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
