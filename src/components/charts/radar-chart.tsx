"use client";
import { RadarChart as RechartsRadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { subject: "Score", value: 82 },
  { subject: "Homework", value: 88 },
  { subject: "Attendance", value: 92 },
  { subject: "Mock Tests", value: 75 },
  { subject: "Behaviour", value: 90 },
];

export function RadarChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <RechartsRadarChart data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11 }} />
        <Radar dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.35} />
        <Tooltip />
      </RechartsRadarChart>
    </ResponsiveContainer>
  );
}
