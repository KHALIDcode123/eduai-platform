"use client";

import { BookOpen, Trophy, Clock, TrendingUp, Bell, LogOut, Play, CheckCircle2 } from "lucide-react";

const stats = [
  { label: "Completed", value: "18", icon: CheckCircle2, color: "text-green-600 bg-green-50" },
  { label: "Pending", value: "3", icon: Clock, color: "text-orange-600 bg-orange-50" },
  { label: "Avg. Score", value: "84%", icon: TrendingUp, color: "text-blue-600 bg-blue-50" },
  { label: "Streak", value: "7 days", icon: Trophy, color: "text-yellow-600 bg-yellow-50" },
];

const upcomingAssessments = [
  { name: "Chapter 6 Quiz — Biology", subject: "Biology", dueDate: "Tomorrow, 11:59 PM", difficulty: "Medium" },
  { name: "Algebra Problem Set 4", subject: "Mathematics", dueDate: "Friday, 11:59 PM", difficulty: "Hard" },
  { name: "Reading Comprehension", subject: "English", dueDate: "Next Monday", difficulty: "Easy" },
];

const recentResults = [
  { name: "Chapter 5 Quiz — Biology", score: 88, maxScore: 100, feedback: "Great work on cell division! Review mitosis phases." },
  { name: "Midterm Exam — Algebra", score: 72, maxScore: 100, feedback: "Strong on equations, but practice quadratic formula." },
  { name: "Vocabulary Test Unit 2", score: 95, maxScore: 100, feedback: "Excellent! You have a strong vocabulary foundation." },
];

export default function StudentDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-gray-900">EduAI</span>
            <span className="text-gray-300">|</span>
            <span className="text-sm text-gray-500">Student Portal</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 relative" aria-label="Notifications">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="w-8 h-8 bg-secondary-100 rounded-full flex items-center justify-center text-secondary-700 text-sm font-bold">
              MC
            </div>
            <button className="p-2 rounded-lg text-gray-500 hover:bg-gray-100" aria-label="Sign out">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, Marcus 🎓</h1>
          <p className="text-gray-500 mt-1">You have 3 pending assessments. Keep up the great work!</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="card text-center">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3 ${color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
              <p className="text-xs text-gray-500 mt-1">{label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upcoming */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-5">Upcoming Assessments</h2>
            <div className="space-y-4">
              {upcomingAssessments.map((a) => (
                <div
                  key={a.name}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{a.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {a.subject} · Due {a.dueDate}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 ml-3">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        a.difficulty === "Easy"
                          ? "bg-green-100 text-green-700"
                          : a.difficulty === "Medium"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {a.difficulty}
                    </span>
                    <button className="btn-primary text-xs py-1.5 px-3 flex items-center gap-1">
                      <Play className="w-3 h-3" />
                      Start
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent results */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-5">Recent Results</h2>
            <div className="space-y-4">
              {recentResults.map((r) => (
                <div key={r.name} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-gray-900 truncate flex-1">{r.name}</p>
                    <span
                      className={`text-sm font-bold ml-3 ${
                        r.score >= 90
                          ? "text-green-600"
                          : r.score >= 70
                          ? "text-blue-600"
                          : "text-orange-600"
                      }`}
                    >
                      {r.score}/{r.maxScore}
                    </span>
                  </div>
                  {/* Progress bar */}
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2">
                    <div
                      className={`h-1.5 rounded-full ${
                        r.score >= 90 ? "bg-green-500" : r.score >= 70 ? "bg-blue-500" : "bg-orange-500"
                      }`}
                      style={{ width: `${(r.score / r.maxScore) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 italic">{r.feedback}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
