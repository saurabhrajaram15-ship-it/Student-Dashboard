"use client";
import dynamic from "next/dynamic";

const RadarChart = dynamic(() => import("recharts").then(m => m.RadarChart), { ssr: false });
const Radar = dynamic(() => import("recharts").then(m => m.Radar), { ssr: false });
const PolarGrid = dynamic(() => import("recharts").then(m => m.PolarGrid), { ssr: false });
const PolarAngleAxis = dynamic(() => import("recharts").then(m => m.PolarAngleAxis), { ssr: false });
const ResponsiveContainer = dynamic(() => import("recharts").then(m => m.ResponsiveContainer), { ssr: false });
const Tooltip = dynamic(() => import("recharts").then(m => m.Tooltip), { ssr: false });

const data = [
  { subject: "Score", value: 82 },
  { subject: "Homework", value: 88 },
  { subject: "Attendance", value: 92 },
  { subject: "Mock Tests", value: 75 },
  { subject: "Behaviour", value: 90 },
];

export function ActivityRadarChart() {
  return (
    <div className="w-full h-[220px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11 }} />
          <Radar dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.35} />
          <Tooltip />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
