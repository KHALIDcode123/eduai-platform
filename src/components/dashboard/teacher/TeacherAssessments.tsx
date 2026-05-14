"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getAssessmentsByTeacher } from "@/services/firebaseService";
import { Plus, Search, Filter, ClipboardList } from "lucide-react";
import type { Assessment } from "@/types";

export default function TeacherAssessments() {
  const { user } = useAuth();
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "draft" | "active" | "closed">("all");

  useEffect(() => {
    loadAssessments();
  }, [user]);

  async function loadAssessments() {
    if (!user) return;
    try {
      const data = await getAssessmentsByTeacher(user.id);
      setAssessments(data);
    } catch (error) {
      console.error("Error loading assessments:", error);
    } finally {
      setLoading(false);
    }
  }

  const filteredAssessments = assessments.filter((a) => {
    const matchesSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "all" || a.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500" />
          <input
            type="text"
            placeholder="Search assessments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field pl-10"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as any)}
          className="select-field w-full sm:w-48"
        >
          <option value="all">All Status</option>
          <option value="draft">Draft</option>
          <option value="active">Active</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      {/* Assessments Grid */}
      {loading ? (
        <div className="text-center py-12 text-dark-400">Loading assessments...</div>
      ) : filteredAssessments.length === 0 ? (
        <div className="card-glow text-center py-16">
          <ClipboardList className="w-16 h-16 text-dark-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No assessments found</h3>
          <p className="text-dark-400 mb-6">
            {searchQuery || filterStatus !== "all"
              ? "Try adjusting your search or filters"
              : "Create your first assessment to get started"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAssessments.map((assessment) => (
            <div key={assessment.id} className="card-glow hover:scale-105 transition-all cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold text-white line-clamp-2">
                  {assessment.title}
                </h3>
                <span
                  className={`badge ${
                    assessment.status === "active"
                      ? "badge-success"
                      : assessment.status === "draft"
                      ? "badge-warning"
                      : "badge-danger"
                  }`}
                >
                  {assessment.status}
                </span>
              </div>

              {assessment.description && (
                <p className="text-sm text-dark-400 mb-4 line-clamp-2">
                  {assessment.description}
                </p>
              )}

              <div className="flex items-center justify-between text-sm text-dark-400 mb-4">
                <span>{assessment.questions.length} questions</span>
                <span>{assessment.totalPoints} points</span>
              </div>

              {assessment.dueDate && (
                <div className="text-xs text-dark-500 mb-4">
                  Due: {new Date(assessment.dueDate).toLocaleDateString()}
                </div>
              )}

              <div className="flex gap-2">
                <button className="btn-primary text-xs flex-1">View Details</button>
                <button className="btn-secondary text-xs flex-1">Edit</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
