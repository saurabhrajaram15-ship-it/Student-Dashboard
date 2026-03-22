import { mockTests } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FlaskConical, Clock, HelpCircle, ChevronRight, Trophy } from "lucide-react";
import Link from "next/link";

export default function MockTestsPage() {
  const groups = {
    all: mockTests,
    available: mockTests.filter(t => t.status === "available"),
    upcoming: mockTests.filter(t => t.status === "upcoming"),
    completed: mockTests.filter(t => t.status === "completed"),
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Mock Tests</h1>
        <p className="text-gray-500 text-sm mt-1">Practice and improve your performance</p>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="available">Available</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        {(["all", "available", "upcoming", "completed"] as const).map(tab => (
          <TabsContent key={tab} value={tab} className="grid sm:grid-cols-2 gap-4 mt-4">
            {groups[tab].length === 0 && (
              <p className="text-sm text-gray-500 col-span-2 text-center py-8">No {tab} tests.</p>
            )}
            {groups[tab].map(test => (
              <Card key={test.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-5 space-y-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <FlaskConical className="h-4 w-4 text-purple-600" />
                        <span className="text-xs text-gray-500 font-medium">{test.subject}</span>
                      </div>
                      <p className="font-semibold text-sm">{test.title}</p>
                    </div>
                    <Badge
                      variant={test.status === "available" ? "default" : test.status === "completed" ? "secondary" : "outline"}
                      className="shrink-0"
                    >
                      {test.status}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{test.duration} min</span>
                    <span className="flex items-center gap-1"><HelpCircle className="h-3 w-3" />{test.totalQuestions} questions</span>
                    {test.score !== undefined && (
                      <span className="flex items-center gap-1 text-green-600 font-semibold">
                        <Trophy className="h-3 w-3" />{test.score}/{test.maxScore}
                      </span>
                    )}
                  </div>

                  {test.scheduledAt && (
                    <p className="text-xs text-amber-600">Scheduled: {test.scheduledAt}</p>
                  )}

                  <Link href={`/dashboard/mock-tests/${test.id}`}>
                    <Button
                      size="sm"
                      variant={test.status === "available" ? "default" : "outline"}
                      className="w-full"
                    >
                      {test.status === "available" ? "Start Test" : test.status === "completed" ? "View Results" : "View Details"}
                      <ChevronRight className="h-3.5 w-3.5 ml-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
