"use client";
import { mockTests } from "@/lib/mock-data";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Clock, HelpCircle, Trophy, ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";
import { use, useState } from "react";

const DEMO_QUESTIONS = [
  { id: "q1", text: "What is the value of π (pi) to 2 decimal places?", options: ["3.12", "3.14", "3.16", "3.18"] },
  { id: "q2", text: "Solve: 2x + 5 = 15. What is x?", options: ["3", "4", "5", "6"] },
  { id: "q3", text: "What is 12² (12 squared)?", options: ["124", "134", "144", "154"] },
];

export default function MockTestDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const test = mockTests.find(t => t.id === id);
  if (!test) notFound();

  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  if (test.status === "completed") {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Link href="/dashboard/mock-tests" className="text-sm text-gray-500 hover:text-blue-600 flex items-center gap-1">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Tests
        </Link>
        <Card>
          <CardContent className="p-8 text-center space-y-4">
            <Trophy className="h-16 w-16 text-amber-500 mx-auto" />
            <h2 className="text-2xl font-bold">{test.title}</h2>
            <div className="text-5xl font-bold text-green-600">{test.score}<span className="text-2xl text-gray-400">/{test.maxScore}</span></div>
            <p className="text-gray-500">You scored {Math.round((test.score! / test.maxScore!) * 100)}%</p>
            <Progress value={(test.score! / test.maxScore!) * 100} className="h-3" />
            <Link href="/dashboard/mock-tests">
              <Button variant="outline" className="mt-4">Back to Tests</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!started) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Link href="/dashboard/mock-tests" className="text-sm text-gray-500 hover:text-blue-600 flex items-center gap-1">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Tests
        </Link>
        <Card>
          <CardHeader>
            <Badge variant="outline" className="w-fit">{test.subject}</Badge>
            <CardTitle className="text-xl">{test.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-950 p-3 rounded-lg">
                <Clock className="h-4 w-4 text-blue-600" />
                <div>
                  <p className="text-xs text-gray-500">Duration</p>
                  <p className="font-semibold">{test.duration} minutes</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-purple-50 dark:bg-purple-950 p-3 rounded-lg">
                <HelpCircle className="h-4 w-4 text-purple-600" />
                <div>
                  <p className="text-xs text-gray-500">Questions</p>
                  <p className="font-semibold">{test.totalQuestions}</p>
                </div>
              </div>
            </div>
            <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 text-sm text-amber-800 dark:text-amber-200 space-y-1">
              <p className="font-semibold">Instructions</p>
              <ul className="list-disc list-inside text-xs space-y-1 text-amber-700 dark:text-amber-300">
                <li>Read each question carefully before answering</li>
                <li>You can navigate between questions freely</li>
                <li>Once submitted, answers cannot be changed</li>
                <li>Ensure a stable internet connection</li>
              </ul>
            </div>
            {test.status === "available" ? (
              <Button className="w-full" size="lg" onClick={() => setStarted(true)}>
                Start Test
              </Button>
            ) : (
              <Button className="w-full" size="lg" disabled>
                Available on {test.scheduledAt}
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  if (submitted) {
    const score = Math.floor(Math.random() * 30) + 70;
    return (
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardContent className="p-8 text-center space-y-4">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
            <h2 className="text-2xl font-bold">Test Submitted!</h2>
            <div className="text-5xl font-bold text-green-600">{score}<span className="text-2xl text-gray-400">/100</span></div>
            <Progress value={score} className="h-3" />
            <p className="text-gray-500">Great job! Results have been recorded.</p>
            <Link href="/dashboard/mock-tests">
              <Button className="mt-2">Back to Tests</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const q = DEMO_QUESTIONS[current];
  const progress = ((current + 1) / DEMO_QUESTIONS.length) * 100;

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>Question {current + 1} of {DEMO_QUESTIONS.length}</span>
        <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {test.duration}:00</span>
      </div>
      <Progress value={progress} className="h-1.5" />

      <Card>
        <CardContent className="p-6 space-y-6">
          <p className="text-base font-medium">{q.text}</p>
          <div className="grid grid-cols-1 gap-3">
            {q.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => setAnswers(prev => ({ ...prev, [q.id]: i }))}
                className={`p-3 rounded-lg border-2 text-left text-sm transition-colors ${
                  answers[q.id] === i
                    ? "border-blue-600 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300"
                    : "border-gray-200 hover:border-gray-300 dark:border-gray-700"
                }`}
              >
                <span className="font-semibold mr-2">{String.fromCharCode(65 + i)}.</span>{opt}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={() => setCurrent(c => c - 1)} disabled={current === 0}>
          <ArrowLeft className="h-4 w-4 mr-1" /> Previous
        </Button>
        {current < DEMO_QUESTIONS.length - 1 ? (
          <Button onClick={() => setCurrent(c => c + 1)}>
            Next <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        ) : (
          <Button onClick={() => setSubmitted(true)} className="bg-green-600 hover:bg-green-700">
            <CheckCircle className="h-4 w-4 mr-1" /> Submit Test
          </Button>
        )}
      </div>
    </div>
  );
}
