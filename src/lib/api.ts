const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });
  if (!res.ok) throw new Error(`API error ${res.status}: ${res.statusText}`);
  return res.json();
}

// ── Types ────────────────────────────────────────────────────────────────────

export interface Course {
  id: string;
  subject: string;
  teacher: string;
  progress: number;
  totalTopics: number;
  completedTopics: number;
  color: string;
}

export interface Assignment {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  status: "pending" | "submitted" | "graded" | "overdue";
  grade?: number;
  maxGrade?: number;
  description?: string;
  attachmentUrl?: string;
}

export interface MockTest {
  id: string;
  title: string;
  subject: string;
  duration: number; // minutes
  totalQuestions: number;
  scheduledAt?: string;
  status: "upcoming" | "available" | "completed";
  score?: number;
  maxScore?: number;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctIndex?: number;
}

export interface MockTestDetail extends MockTest {
  questions: Question[];
  instructions: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "success";
  createdAt: string;
  read: boolean;
}

export interface Doubt {
  id: string;
  question: string;
  subject: string;
  status: "open" | "answered";
  answer?: string;
  createdAt: string;
}

export interface AttendanceSummary {
  totalDays: number;
  present: number;
  absent: number;
  late: number;
  percentage: number;
}

export interface PerformanceTrend {
  month: string;
  score: number;
  homework: number;
  attendance: number;
}

// ── API calls ────────────────────────────────────────────────────────────────

export const coursesApi = {
  getAll: () => apiFetch<Course[]>("/courses"),
  getById: (id: string) => apiFetch<Course>(`/courses/${id}`),
};

export const assignmentsApi = {
  getAll: () => apiFetch<Assignment[]>("/assignments"),
  getById: (id: string) => apiFetch<Assignment>(`/assignments/${id}`),
  submit: (id: string, file: File) => {
    const form = new FormData();
    form.append("file", file);
    return apiFetch<{ success: boolean }>(`/assignments/${id}/submit`, {
      method: "POST",
      headers: {},
      body: form,
    });
  },
};

export const mockTestsApi = {
  getAll: () => apiFetch<MockTest[]>("/mocks"),
  getById: (id: string) => apiFetch<MockTestDetail>(`/mocks/${id}`),
  submit: (id: string, answers: Record<string, number>) =>
    apiFetch<{ score: number; maxScore: number; passed: boolean }>(
      `/mocks/${id}/submit`,
      { method: "POST", body: JSON.stringify({ answers }) }
    ),
};

export const notificationsApi = {
  getAll: () => apiFetch<Notification[]>("/notifications"),
  markRead: (id: string) =>
    apiFetch<void>(`/notifications/${id}/read`, { method: "PATCH" }),
};

export const doubtsApi = {
  getAll: () => apiFetch<Doubt[]>("/doubts"),
  create: (question: string, subject: string) =>
    apiFetch<Doubt>("/doubts", {
      method: "POST",
      body: JSON.stringify({ question, subject }),
    }),
};

export const performanceApi = {
  getTrends: () => apiFetch<PerformanceTrend[]>("/performance/trends"),
  getAttendance: () => apiFetch<AttendanceSummary>("/attendance/summary"),
};
