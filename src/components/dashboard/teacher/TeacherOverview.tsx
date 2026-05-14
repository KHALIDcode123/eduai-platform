"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getAssessmentsByTeacher, getSubmissionsByAssessment } from "@/services/firebaseService";
import { BookOpen, ClipboardList, Users, TrendingUp, Clock, CheckCircle2, BarChart3 } from "lucide-react";
import type { Assessment, Submission } from "@/types";

export default function TeacherOverview() {
  const { user } = useAuth();
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [user]);

  async function loadData() {
    if (!user) return;
    try {
      const assessmentsData = await getAssessmentsByTeacher(user.id);
      setAssessments(assessmentsData);

      // Load recent submissions
      const allSubmissions: Submission[] = [];
      for (const assessment of assessmentsData.slice(0, 5)) {
        const subs = await getSubmissionsByAssessment(assessment.id);
        allSubmissions.push(...subs);
      }
      setSubmissions(allSubmissions.slice(0, 10));
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  }

  const activeAssessments = assessments.filter((a) => a.status === "active").length;
  const totalSubmissions = submissions.length;
  const gradedSubmissions = submissions.filter((s) => s.status === "graded").length;
  const avgScore = submissions.length > 0
    ? Math.round(
        submissions
          .filter((s) => s.totalScore !== undefined)
          .reduce((sum, s) => sum + (s.totalScore! / s.maxScore) * 100, 0) /
          submissions.filter((s) => s.totalScore !== undefined).length
      )
    : 0;

  const stats = [
    { label: "Active Assessments", value: activeAssessments.toString(), icon: ClipboardList, color: "text-blue-400 bg-blue-500/20 border-blue-500/30" },
    { label: "Total Submissions", value: totalSubmissions.toString(), icon: Users, color: "text-green-400 bg-green-500/20 border-green-500/30" },
    { label: "Graded", value: gradedSubmissions.toString(), icon: CheckCircle2, color: "text-purple-400 bg-purple-500/20 border-purple-500/30" },
    { label: "Avg. Score", value: `${avgScore}%`, icon: TrendingUp, color: "text-yellow-400 bg-yellow-500/20 border-yellow-500/30" },
  ];

  const recentAssessments = assessments.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="card-glow">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-dark-400">{label}</span>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${color}`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-bold text-white">{value}</p>
          </div>
        ))}
      </div>

      {/* Recent Assessments */}
      <div className="card-glow">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Recent Assessments</h2>
          <button className="text-sm text-primary-400 hover:text-primary-300 font-medium">
            View all
          </button>
        </div>

        {loading ? (
          <div className="text-center py-8 text-dark-400">Loading...</div>
        ) : recentAssessments.length === 0 ? (
          <div className="text-center py-12">
            <ClipboardList className="w-12 h-12 text-dark-600 mx-auto mb-3" />
            <p className="text-dark-400">No assessments yet</p>
            <p className="text-sm text-dark-500 mt-1">Create your first assessment to get started</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-dark-700/50">
                  <th className="text-left text-dark-400 font-medium pb-3">Title</th>
                  <th className="text-left text-dark-400 font-medium pb-3">Questions</th>
                  <th className="text-left text-dark-400 font-medium pb-3">Status</th>
                  <th className="text-left text-dark-400 font-medium pb-3">Due Date</th>
                  <th className="text-left text-dark-400 font-medium pb-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-700/30">
                {recentAssessments.map((assessment) => (
                  <tr key={assessment.id} className="hover:bg-dark-700/20 transition-colors">
                    <td className="py-3 font-medium text-white">{assessment.title}</td>
                    <td className="py-3 text-dark-300">{assessment.questions.length}</td>
                    <td className="py-3">
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
                    </td>
                    <td className="py-3 text-dark-300">
                      {assessment.dueDate
                        ? new Date(assessment.dueDate).toLocaleDateString()
                        : "No due date"}
                    </td>
                    <td className="py-3">
                      <button className="text-primary-400 hover:text-primary-300 font-medium flex items-center gap-1">
                        <BarChart3 className="w-4 h-4" />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
