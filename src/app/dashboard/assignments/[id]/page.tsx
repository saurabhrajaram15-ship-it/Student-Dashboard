"use client";
import { mockAssignments } from "@/lib/mock-data";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Upload, CheckCircle, Clock, XCircle } from "lucide-react";
import Link from "next/link";
import { use, useState } from "react";

const statusIcon: Record<string, React.ReactNode> = {
  pending: <Clock className="h-4 w-4 text-amber-600" />,
  submitted: <CheckCircle className="h-4 w-4 text-blue-600" />,
  graded: <CheckCircle className="h-4 w-4 text-green-600" />,
  overdue: <XCircle className="h-4 w-4 text-red-600" />,
};

export default function AssignmentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const assignment = mockAssignments.find(a => a.id === id);
  if (!assignment) notFound();

  const [submitted, setSubmitted] = useState(assignment.status === "submitted");

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Link href="/dashboard/assignments" className="hover:text-blue-600">Assignments</Link>
        <span>/</span>
        <span className="text-gray-900 dark:text-white font-medium truncate">{assignment.title}</span>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <CardTitle className="text-xl">{assignment.title}</CardTitle>
            <Badge variant={assignment.status === "overdue" ? "destructive" : assignment.status === "graded" ? "default" : "outline"}>
              <span className="flex items-center gap-1">
                {statusIcon[assignment.status]}
                {assignment.status}
              </span>
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500 text-xs font-medium uppercase tracking-wide">Subject</p>
              <p className="font-medium mt-0.5">{assignment.subject}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs font-medium uppercase tracking-wide">Due Date</p>
              <p className="font-medium mt-0.5 flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" /> {assignment.dueDate}
              </p>
            </div>
            {assignment.grade !== undefined && (
              <div>
                <p className="text-gray-500 text-xs font-medium uppercase tracking-wide">Grade</p>
                <p className="font-bold text-green-600 text-lg mt-0.5">{assignment.grade} / {assignment.maxGrade}</p>
              </div>
            )}
          </div>

          {assignment.description && (
            <div>
              <p className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-1">Description</p>
              <p className="text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 rounded-lg p-3">{assignment.description}</p>
            </div>
          )}

          {(assignment.status === "pending" || assignment.status === "overdue") && (
            <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg p-6 text-center">
              {submitted ? (
                <div className="flex flex-col items-center gap-2">
                  <CheckCircle className="h-10 w-10 text-green-500" />
                  <p className="font-medium text-green-600">Assignment submitted!</p>
                  <p className="text-xs text-gray-500">Waiting for teacher review</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <Upload className="h-10 w-10 text-gray-300" />
                  <p className="text-sm text-gray-500">Upload your completed assignment</p>
                  <Button onClick={() => setSubmitted(true)} className="mt-1">
                    <Upload className="h-4 w-4 mr-2" /> Submit Assignment
                  </Button>
                  <p className="text-xs text-gray-400">PDF, DOC, or image files accepted</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
