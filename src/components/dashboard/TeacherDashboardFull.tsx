"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  Sparkles,
  Plus,
  Bell,
  LogOut,
  LayoutDashboard,
  ClipboardList,
  BarChart3,
  Settings,
} from "lucide-react";
import DashboardHeader from "./DashboardHeader";
import TeacherOverview from "./teacher/TeacherOverview";
import TeacherAssessments from "./teacher/TeacherAssessments";
import TeacherAnalytics from "./teacher/TeacherAnalytics";
import CreateAssessmentModal from "./teacher/CreateAssessmentModal";

type Tab = "overview" | "assessments" | "analytics";

export default function TeacherDashboardFull() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [showCreateModal, setShowCreateModal] = useState(false);

  const tabs = [
    { id: "overview" as Tab, label: "Overview", icon: LayoutDashboard },
    { id: "assessments" as Tab, label: "Assessments", icon: ClipboardList },
    { id: "analytics" as Tab, label: "Analytics", icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Header */}
      <DashboardHeader
        user={user!}
        onLogout={logout}
        title="Teacher Portal"
        actions={
          <button
            onClick={() => setShowCreateModal(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New Assessment
          </button>
        }
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">
            Good morning, {user?.name?.split(" ")[0]} 👋
          </h1>
          <p className="text-dark-400 mt-2">
            Here&apos;s what&apos;s happening with your classes today.
          </p>
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
        {activeTab === "overview" && <TeacherOverview />}
        {activeTab === "assessments" && <TeacherAssessments />}
        {activeTab === "analytics" && <TeacherAnalytics />}
      </main>

      {/* Create Assessment Modal */}
      {showCreateModal && (
        <CreateAssessmentModal onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  );
}
