"use client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import type { PerformanceTrend } from "@/lib/api";

export function PerformanceChart({ data }: { data: PerformanceTrend[] }) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
        <XAxis dataKey="month" tick={{ fontSize: 11 }} />
        <YAxis tick={{ fontSize: 11 }} domain={[0, 100]} />
        <Tooltip />
        <Legend wrapperStyle={{ fontSize: 11 }} />
        <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={2} dot={false} name="Score" />
        <Line type="monotone" dataKey="homework" stroke="#10b981" strokeWidth={2} dot={false} name="Homework" />
        <Line type="monotone" dataKey="attendance" stroke="#f59e0b" strokeWidth={2} dot={false} name="Attendance" />
      </LineChart>
    </ResponsiveContainer>
  );
}
