import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HelpCircle, MessageCircleQuestion, Mail, BookOpen, FlaskConical, ClipboardList } from "lucide-react";

const faqs = [
  { q: "How do I submit an assignment?", a: "Go to Assignments, click on the assignment, then click 'Submit Assignment' and upload your file." },
  { q: "How do I take a mock test?", a: "Go to Mock Tests, find an available test, click 'Start Test', answer all questions, and click 'Submit'." },
  { q: "Where can I find my study notes?", a: "Go to the Notes section in the sidebar. All materials uploaded by your teachers will appear there." },
  { q: "How do I ask my teacher a question?", a: "Use the 'Ask a Doubt' section. Select the subject, type your question, and submit. Your teacher will respond shortly." },
  { q: "How is my attendance calculated?", a: "Attendance is tracked by your teachers. Present, late, and excused days all count towards attendance." },
  { q: "Can I change my profile picture?", a: "Your profile picture is pulled from your Google account. Update it on Google to see changes here." },
];

const guides = [
  { icon: <ClipboardList className="h-5 w-5 text-amber-600" />, title: "Assignments", desc: "View, track, and submit your homework" },
  { icon: <FlaskConical className="h-5 w-5 text-purple-600" />, title: "Mock Tests", desc: "Practice tests to prepare for exams" },
  { icon: <BookOpen className="h-5 w-5 text-blue-600" />, title: "Courses", desc: "Browse your enrolled subjects and topics" },
  { icon: <MessageCircleQuestion className="h-5 w-5 text-green-600" />, title: "Ask a Doubt", desc: "Submit questions to your teachers" },
];

export default function HelpPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Help & Support</h1>
        <p className="text-gray-500 text-sm mt-1">Find answers and learn how to use the portal</p>
      </div>

      {/* Quick guides */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {guides.map(g => (
          <Card key={g.title} className="text-center">
            <CardContent className="p-4 space-y-2">
              <div className="flex justify-center">{g.icon}</div>
              <p className="text-sm font-semibold">{g.title}</p>
              <p className="text-xs text-gray-500">{g.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* FAQs */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <HelpCircle className="h-4 w-4" /> Frequently Asked Questions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b dark:border-gray-800 pb-4 last:border-0 last:pb-0">
              <p className="font-medium text-sm">{faq.q}</p>
              <p className="text-sm text-gray-500 mt-1">{faq.a}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Contact */}
      <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
        <CardContent className="p-5 flex items-center gap-4">
          <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
            <Mail className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <p className="font-semibold text-sm">Still need help?</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
              Email your administrator at <span className="font-medium text-blue-700 dark:text-blue-300">support@theasiankid.com</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
