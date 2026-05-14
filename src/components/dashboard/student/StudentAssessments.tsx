"use client";

import { useState } from "react";
import { Search, Filter, Play, CheckCircle2, Clock } from "lucide-react";
import TakeAssessmentModal from "./TakeAssessmentModal";

export default function StudentAssessments() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "available" | "completed">("all");
  const [selectedAssessment, setSelectedAssessment] = useState<string | null>(null);

  // Mock data - replace with real data from Firebase
  const assessments = [
    { id: "1", title: "Chapter 6 Quiz — Biology", subject: "Biology", dueDate: "2026-05-15", status: "available", questions: 10, points: 100 },
    { id: "2", title: "Algebra Problem Set 4", subject: "Mathematics", dueDate: "2026-05-17", status: "available", questions: 15, points: 150 },
    { id: "3", title: "Chapter 5 Quiz — Biology", subject: "Biology", dueDate: "2026-05-10", status: "completed", questions: 10, points: 100 },
  ];

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
          <option value="all">All</option>
          <option value="available">Available</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Assessments List */}
      <div className="space-y-4">
        {filteredAssessments.map((assessment) => (
          <div key={assessment.id} className="card-glow hover:scale-[1.02] transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-1">{assessment.title}</h3>
                <p className="text-sm text-dark-400">{assessment.subject}</p>
              </div>
              <span
                className={`badge ${
                  assessment.status === "completed" ? "badge-success" : "badge-primary"
                }`}
              >
                {assessment.status === "completed" ? (
                  <><CheckCircle2 className="w-3 h-3" /> Completed</>
                ) : (
                  <><Clock className="w-3 h-3" /> Available</>
                )}
              </span>
            </div>

            <div className="flex items-center gap-6 text-sm text-dark-400 mb-4">
              <span>{assessment.questions} questions</span>
              <span>{assessment.points} points</span>
              <span>Due: {new Date(assessment.dueDate).toLocaleDateString()}</span>
            </div>

            {assessment.status === "available" ? (
              <button
                onClick={() => setSelectedAssessment(assessment.id)}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4" />
                Start Assessment
              </button>
            ) : (
              <button className="btn-secondary w-full">View Results</button>
            )}
          </div>
        ))}
      </div>

      {/* Take Assessment Modal */}
      {selectedAssessment && (
        <TakeAssessmentModal
          assessmentId={selectedAssessment}
          onClose={() => setSelectedAssessment(null)}
        />
      )}
    </div>
  );
}
