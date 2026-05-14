"use client";

import { useState } from "react";
import {
  BookOpen,
  ClipboardList,
  Users,
  TrendingUp,
  Plus,
  Bell,
  LogOut,
  BarChart3,
  Clock,
  CheckCircle2,
} from "lucide-react";

const stats = [
  { label: "Active Classes", value: "6", icon: BookOpen, change: "+1 this month", positive: true },
  { label: "Assessments", value: "24", icon: ClipboardList, change: "+3 this week", positive: true },
  { label: "Total Students", value: "142", icon: Users, change: "+8 this month", positive: true },
  { label: "Avg. Score", value: "78%", icon: TrendingUp, change: "-2% vs last month", positive: false },
];

const recentAssessments = [
  { name: "Chapter 5 Quiz — Biology", class: "Grade 10 Bio", submissions: 28, total: 30, avgScore: 82, status: "active" },
  { name: "Midterm Exam — Algebra", class: "Grade 9 Math", submissions: 25, total: 25, avgScore: 74, status: "graded" },
  { name: "Essay: Climate Change", class: "Grade 11 Science", submissions: 12, total: 32, avgScore: null, status: "active" },
  { name: "Vocabulary Test Unit 3", class: "Grade 8 English", submissions: 30, total: 30, avgScore: 91, status: "graded" },
];

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "assessments" | "students">("overview");

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
            <span className="text-sm text-gray-500">Teacher Portal</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 relative" aria-label="Notifications">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 text-sm font-bold">
              SJ
            </div>
            <button className="p-2 rounded-lg text-gray-500 hover:bg-gray-100" aria-label="Sign out">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Good morning, Sarah 👋</h1>
            <p className="text-gray-500 mt-1">Here&apos;s what&apos;s happening with your classes today.</p>
          </div>
          <button className="btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Assessment
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1 w-fit mb-8">
          {(["overview", "assessments", "students"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium rounded-md capitalize transition-colors ${
                activeTab === tab ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map(({ label, value, icon: Icon, change, positive }) => (
            <div key={label} className="card">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-500">{label}</span>
                <div className="w-9 h-9 bg-primary-50 rounded-lg flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary-600" />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
              <p className={`text-xs mt-1 ${positive ? "text-green-600" : "text-red-500"}`}>{change}</p>
            </div>
          ))}
        </div>

        {/* Recent assessments */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Recent Assessments</h2>
            <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">View all</button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-gray-500 font-medium pb-3">Assessment</th>
                  <th className="text-left text-gray-500 font-medium pb-3">Class</th>
                  <th className="text-left text-gray-500 font-medium pb-3">Submissions</th>
                  <th className="text-left text-gray-500 font-medium pb-3">Avg. Score</th>
                  <th className="text-left text-gray-500 font-medium pb-3">Status</th>
                  <th className="text-left text-gray-500 font-medium pb-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentAssessments.map((a) => (
                  <tr key={a.name} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 font-medium text-gray-900">{a.name}</td>
                    <td className="py-3 text-gray-500">{a.class}</td>
                    <td className="py-3 text-gray-700">
                      {a.submissions}/{a.total}
                    </td>
                    <td className="py-3 text-gray-700">
                      {a.avgScore !== null ? `${a.avgScore}%` : "—"}
                    </td>
                    <td className="py-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                          a.status === "graded"
                            ? "bg-green-100 text-green-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {a.status === "graded" ? (
                          <CheckCircle2 className="w-3 h-3" />
                        ) : (
                          <Clock className="w-3 h-3" />
                        )}
                        {a.status === "graded" ? "Graded" : "Active"}
                      </span>
                    </td>
                    <td className="py-3">
                      <button className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1">
                        <BarChart3 className="w-4 h-4" />
                        Results
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
