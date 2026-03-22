import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Download, ExternalLink } from "lucide-react";

const mockNotes = [
  { id: "1", title: "Quadratic Equations - Chapter 5", subject: "Mathematics", uploadedAt: "2026-03-18", type: "PDF" },
  { id: "2", title: "Newton's Laws Summary", subject: "Physics", uploadedAt: "2026-03-16", type: "PDF" },
  { id: "3", title: "Periodic Table Reference Sheet", subject: "Chemistry", uploadedAt: "2026-03-15", type: "PDF" },
  { id: "4", title: "Cell Structure Diagrams", subject: "Biology", uploadedAt: "2026-03-14", type: "PDF" },
  { id: "5", title: "Grammar Rules - Tenses", subject: "English", uploadedAt: "2026-03-12", type: "PDF" },
  { id: "6", title: "Trigonometry Formulas", subject: "Mathematics", uploadedAt: "2026-03-10", type: "PDF" },
];

const subjectColor: Record<string, string> = {
  Mathematics: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  Physics: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
  Chemistry: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  Biology: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
  English: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
};

export default function NotesPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Study Notes</h1>
        <p className="text-gray-500 text-sm mt-1">Access materials shared by your teachers</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockNotes.map(note => (
          <Card key={note.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg shrink-0">
                  <FileText className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium leading-tight">{note.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{note.uploadedAt}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Badge className={`text-xs ${subjectColor[note.subject]}`} variant="secondary">
                  {note.subject}
                </Badge>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <Download className="h-3.5 w-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
