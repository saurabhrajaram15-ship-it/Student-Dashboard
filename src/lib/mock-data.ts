// Mock data used when the backend is unavailable
import type {
  Course,
  Assignment,
  MockTest,
  Notification,
  Doubt,
  AttendanceSummary,
  PerformanceTrend,
} from "./api";

export const mockCourses: Course[] = [
  { id: "1", subject: "Mathematics", teacher: "Mr. Sharma", progress: 72, totalTopics: 18, completedTopics: 13, color: "blue" },
  { id: "2", subject: "Physics", teacher: "Ms. Patel", progress: 58, totalTopics: 15, completedTopics: 9, color: "purple" },
  { id: "3", subject: "Chemistry", teacher: "Mr. Gupta", progress: 85, totalTopics: 20, completedTopics: 17, color: "green" },
  { id: "4", subject: "Biology", teacher: "Ms. Singh", progress: 45, totalTopics: 22, completedTopics: 10, color: "red" },
  { id: "5", subject: "English", teacher: "Ms. Khan", progress: 90, totalTopics: 12, completedTopics: 11, color: "yellow" },
];

export const mockAssignments: Assignment[] = [
  { id: "1", title: "Quadratic Equations Practice", subject: "Mathematics", dueDate: "2026-03-25", status: "pending", description: "Complete exercises 5.1 to 5.4" },
  { id: "2", title: "Newton's Laws Essay", subject: "Physics", dueDate: "2026-03-22", status: "submitted" },
  { id: "3", title: "Periodic Table Quiz", subject: "Chemistry", dueDate: "2026-03-20", status: "graded", grade: 88, maxGrade: 100 },
  { id: "4", title: "Cell Structure Diagram", subject: "Biology", dueDate: "2026-03-18", status: "overdue" },
  { id: "5", title: "Shakespeare Analysis", subject: "English", dueDate: "2026-03-28", status: "pending", description: "Write a 500-word analysis of Hamlet Act 3" },
  { id: "6", title: "Trigonometry Worksheet", subject: "Mathematics", dueDate: "2026-03-15", status: "graded", grade: 92, maxGrade: 100 },
];

export const mockTests: MockTest[] = [
  { id: "1", title: "Algebra Mock Test 1", subject: "Mathematics", duration: 60, totalQuestions: 30, status: "completed", score: 85, maxScore: 100 },
  { id: "2", title: "Physics Mid-Term", subject: "Physics", duration: 90, totalQuestions: 45, status: "available" },
  { id: "3", title: "Chemistry Periodic Table", subject: "Chemistry", duration: 45, totalQuestions: 25, status: "upcoming", scheduledAt: "2026-03-26" },
  { id: "4", title: "Biology Cell Theory", subject: "Biology", duration: 60, totalQuestions: 30, status: "completed", score: 72, maxScore: 100 },
  { id: "5", title: "English Grammar", subject: "English", duration: 30, totalQuestions: 20, status: "available" },
];

export const mockNotifications: Notification[] = [
  { id: "1", title: "New Assignment Posted", message: "A new Mathematics assignment has been posted. Due on March 25.", type: "info", createdAt: "2026-03-22T09:00:00Z", read: false },
  { id: "2", title: "Mock Test Scheduled", message: "Chemistry Periodic Table mock test scheduled for March 26.", type: "warning", createdAt: "2026-03-21T14:00:00Z", read: false },
  { id: "3", title: "Grade Released", message: "Your Periodic Table Quiz grade is now available.", type: "success", createdAt: "2026-03-20T11:00:00Z", read: true },
];

export const mockDoubts: Doubt[] = [
  { id: "1", question: "How do you solve simultaneous equations?", subject: "Mathematics", status: "answered", answer: "Use substitution or elimination method...", createdAt: "2026-03-20T10:00:00Z" },
  { id: "2", question: "What is the difference between speed and velocity?", subject: "Physics", status: "open", createdAt: "2026-03-22T08:00:00Z" },
];

export const mockAttendance: AttendanceSummary = {
  totalDays: 60,
  present: 52,
  absent: 5,
  late: 3,
  percentage: 92,
};

export const mockPerformance: PerformanceTrend[] = [
  { month: "Oct", score: 68, homework: 75, attendance: 88 },
  { month: "Nov", score: 72, homework: 80, attendance: 90 },
  { month: "Dec", score: 78, homework: 85, attendance: 85 },
  { month: "Jan", score: 74, homework: 70, attendance: 92 },
  { month: "Feb", score: 82, homework: 88, attendance: 94 },
  { month: "Mar", score: 86, homework: 92, attendance: 92 },
];
