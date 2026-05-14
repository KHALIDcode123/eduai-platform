"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getSubmissionsByStudent } from "@/services/firebaseService";
import { CheckCircle2, Clock, TrendingUp, Trophy, Play, AlertCircle } from "lucide-react";
import type { Submission } from "@/types";

export default function StudentOverview() {
  const { user } = useAuth();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSubmissions();
  }, [user]);

  async function loadSubmissions() {
    if (!user) return;
    try {
      const data = await getSubmissionsByStudent(user.id);
      setSubmissions(data);
    } catch (error) {
      console.error("Error loading submissions:", error);
    } finally {
      setLoading(false);
    }
  }

  const completed = submissions.filter((s) => s.status === "graded").length;
  const pending = submissions.filter((s) => s.status === "submitted" || s.status === "grading").length;
  const avgScore = submissions.length > 0
    ? Math.round(
        submissions
          .filter((s) => s.totalScore !== undefined)
          .reduce((sum, s) => sum + (s.totalScore! / s.maxScore) * 100, 0) /
          submissions.filter((s) => s.totalScore !== undefined).length
      )
    : 0;

  const stats = [
    { label: "Completed", value: completed.toString(), icon: CheckCircle2, color: "text-green-400 bg-green-500/20 border-green-500/30" },
    { label: "Pending", value: pending.toString(), icon: Clock, color: "text-orange-400 bg-orange-500/20 border-orange-500/30" },
    { label: "Avg. Score", value: `${avgScore}%`, icon: TrendingUp, color: "text-blue-400 bg-blue-500/20 border-blue-500/30" },
    { label: "Streak", value: "7 days", icon: Trophy, color: "text-yellow-400 bg-yellow-500/20 border-yellow-500/30" },
  ];

  const recentResults = submissions
    .filter((s) => s.status === "graded")
    .slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="card-glow text-center">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 border ${color}`}>
              <Icon className="w-6 h-6" />
            </div>
            <p className="text-3xl font-bold text-white">{value}</p>
            <p className="text-xs text-dark-400 mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Upcoming Assessments */}
      <div className="card-glow">
        <h2 className="text-xl font-semibold text-white mb-5">Upcoming Assessments</h2>
        <div className="space-y-3">
          {[
            { name: "Chapter 6 Quiz — Biology", subject: "Biology", dueDate: "Tomorrow, 11:59 PM", difficulty: "Medium" },
            { name: "Algebra Problem Set 4", subject: "Mathematics", dueDate: "Friday, 11:59 PM", difficulty: "Hard" },
            { name: "Reading Comprehension", subject: "English", dueDate: "Next Monday", difficulty: "Easy" },
          ].map((assessment) => (
            <div
              key={assessment.name}
              className="flex items-center justify-between p-4 bg-dark-900/50 rounded-lg hover:bg-dark-800/50 transition-colors border border-dark-700/30"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{assessment.name}</p>
                <p className="text-xs text-dark-400 mt-1">
                  {assessment.subject} · Due {assessment.dueDate}
                </p>
              </div>
              <div className="flex items-center gap-3 ml-4">
                <span
                  className={`badge text-xs ${
                    assessment.difficulty === "Easy"
                      ? "badge-success"
                      : assessment.difficulty === "Medium"
                      ? "badge-warning"
                      : "badge-danger"
                  }`}
                >
                  {assessment.difficulty}
                </span>
                <button className="btn-primary text-xs py-2 px-4 flex items-center gap-1">
                  <Play className="w-3 h-3" />
                  Start
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Results */}
      <div className="card-glow">
        <h2 className="text-xl font-semibold text-white mb-5">Recent Results</h2>
        {loading ? (
          <div className="text-center py-8 text-dark-400">Loading...</div>
        ) : recentResults.length === 0 ? (
          <div className="text-center py-12">
            <AlertCircle className="w-12 h-12 text-dark-600 mx-auto mb-3" />
            <p className="text-dark-400">No results yet</p>
            <p className="text-sm text-dark-500 mt-1">Complete an assessment to see your results</p>
          </div>
        ) : (
          <div className="space-y-4">
            {recentResults.map((result) => {
              const percentage = result.totalScore && result.maxScore
                ? Math.round((result.totalScore / result.maxScore) * 100)
                : 0;

              return (
                <div key={result.id} className="p-4 bg-dark-900/50 rounded-lg border border-dark-700/30">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-medium text-white truncate flex-1">
                      Assessment #{result.assessmentId.slice(0, 8)}
                    </p>
                    <span
                      className={`text-sm font-bold ml-3 ${
                        percentage >= 90
                          ? "text-green-400"
                          : percentage >= 70
                          ? "text-blue-400"
                          : "text-orange-400"
                      }`}
                    >
                      {result.totalScore}/{result.maxScore}
                    </span>
                  </div>
                  {/* Progress bar */}
                  <div className="progress-bar h-2 mb-3">
                    <div
                      className={`progress-fill ${
                        percentage >= 90
                          ? "bg-green-500"
                          : percentage >= 70
                          ? "bg-blue-500"
                          : "bg-orange-500"
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  {result.gradedAnswers && result.gradedAnswers[0]?.feedback && (
                    <p className="text-xs text-dark-400 italic">
                      {result.gradedAnswers[0].feedback.slice(0, 100)}...
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
