"use client";
import { useState } from "react";
import { mockDoubts } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageCircleQuestion, CheckCircle, Clock, Send } from "lucide-react";
import type { Doubt } from "@/lib/api";

const SUBJECTS = ["Mathematics", "Physics", "Chemistry", "Biology", "English"];

export default function DoubtPage() {
  const [doubts, setDoubts] = useState<Doubt[]>(mockDoubts);
  const [question, setQuestion] = useState("");
  const [subject, setSubject] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!question.trim() || !subject) return;
    const newDoubt: Doubt = {
      id: String(Date.now()),
      question,
      subject,
      status: "open",
      createdAt: new Date().toISOString(),
    };
    setDoubts(prev => [newDoubt, ...prev]);
    setQuestion("");
    setSubject("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Ask a Doubt</h1>
        <p className="text-gray-500 text-sm mt-1">Submit your questions and get answers from your teachers</p>
      </div>

      {/* Submit form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <MessageCircleQuestion className="h-4 w-4" /> New Question
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="subject">Subject</Label>
              <Select value={subject} onValueChange={(v) => setSubject(v ?? "")}>
                <SelectTrigger><SelectValue placeholder="Select a subject" /></SelectTrigger>
                <SelectContent>
                  {SUBJECTS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="question">Your Question</Label>
              <Input
                id="question"
                placeholder="Type your question here..."
                value={question}
                onChange={e => setQuestion(e.target.value)}
                className="h-20"
              />
            </div>
            <Button type="submit" className="w-full" disabled={!question.trim() || !subject}>
              <Send className="h-4 w-4 mr-2" /> Submit Question
            </Button>
            {submitted && (
              <p className="text-sm text-green-600 text-center flex items-center justify-center gap-1">
                <CheckCircle className="h-4 w-4" /> Question submitted! Your teacher will respond soon.
              </p>
            )}
          </form>
        </CardContent>
      </Card>

      {/* Doubt history */}
      <div className="space-y-3">
        <h2 className="font-semibold text-sm text-gray-500 uppercase tracking-wide">Previous Questions</h2>
        {doubts.map(d => (
          <Card key={d.id}>
            <CardContent className="p-4 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="text-xs">{d.subject}</Badge>
                    <Badge variant={d.status === "answered" ? "default" : "secondary"} className="text-xs">
                      {d.status === "answered"
                        ? <span className="flex items-center gap-1"><CheckCircle className="h-3 w-3" />Answered</span>
                        : <span className="flex items-center gap-1"><Clock className="h-3 w-3" />Pending</span>
                      }
                    </Badge>
                  </div>
                  <p className="text-sm font-medium">{d.question}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{new Date(d.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              {d.answer && (
                <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-3">
                  <p className="text-xs font-semibold text-green-700 dark:text-green-300 mb-1">Teacher's Answer:</p>
                  <p className="text-sm text-green-800 dark:text-green-200">{d.answer}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
