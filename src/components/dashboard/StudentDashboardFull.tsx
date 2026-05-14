"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { LayoutDashboard, ClipboardList, TrendingUp, BookOpen } from "lucide-react";
import DashboardHeader from "./DashboardHeader";
import StudentOverview from "./student/StudentOverview";
import StudentAssessments from "./student/StudentAssessments";
import StudentProgress from "./student/StudentProgress";

type Tab = "overview" | "assessments" | "progress";

export default function StudentDashboardFull() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  const tabs = [
    { id: "overview" as Tab, label: "Overview", icon: LayoutDashboard },
    { id: "assessments" as Tab, label: "Assessments", icon: ClipboardList },
    { id: "progress" as Tab, label: "Progress", icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Header */}
      <DashboardHeader user={user!} onLogout={logout} title="Student Portal" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">
            Welcome back, {user?.name?.split(" ")[0]} 🎓
          </h1>
          <p className="text-dark-400 mt-2">Keep up the great work on your learning journey!</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 bg-dark-800/60 backdrop-blur-sm rounded-xl p-1.5 w-fit mb-8 border border-dark-700/50">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
                activeTab === id
                  ? "bg-primary-600 text-white shadow-glow"
                  : "text-dark-400 hover:text-white hover:bg-dark-700/50"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === "overview" && <StudentOverview />}
        {activeTab === "assessments" && <StudentAssessments />}
        {activeTab === "progress" && <StudentProgress />}
      </main>
    </div>
  );
}
