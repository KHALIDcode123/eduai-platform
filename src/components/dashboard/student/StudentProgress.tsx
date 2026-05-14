"use client";

import { TrendingUp, Award, Target, BookOpen } from "lucide-react";

export default function StudentProgress() {
  return (
    <div className="space-y-8">
      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-glow">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-500/20 border border-blue-500/30 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">84%</p>
              <p className="text-xs text-dark-400">Overall Average</p>
            </div>
          </div>
          <p className="text-xs text-green-400">↑ 5% from last month</p>
        </div>

        <div className="card-glow">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-purple-500/20 border border-purple-500/30 rounded-xl flex items-center justify-center">
              <Award className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">18</p>
              <p className="text-xs text-dark-400">Completed</p>
            </div>
          </div>
          <p className="text-xs text-dark-400">Out of 21 total</p>
        </div>

        <div className="card-glow">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-yellow-500/20 border border-yellow-500/30 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">7</p>
              <p className="text-xs text-dark-400">Day Streak</p>
            </div>
          </div>
          <p className="text-xs text-dark-400">Keep it up!</p>
        </div>
      </div>

      {/* Subject Performance */}
      <div className="card-glow">
        <h2 className="text-xl font-semibold text-white mb-6">Performance by Subject</h2>
        <div className="space-y-5">
          {[
            { subject: "Biology", score: 88, assessments: 6, color: "bg-green-500" },
            { subject: "Mathematics", score: 82, assessments: 5, color: "bg-blue-500" },
            { subject: "English", score: 91, assessments: 4, color: "bg-purple-500" },
            { subject: "Physics", score: 76, assessments: 3, color: "bg-orange-500" },
          ].map((item) => (
            <div key={item.subject}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-dark-400" />
                  <span className="text-sm font-medium text-white">{item.subject}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-white">{item.score}%</span>
                  <span className="text-xs text-dark-500 ml-2">({item.assessments} assessments)</span>
                </div>
              </div>
              <div className="progress-bar h-2.5">
                <div
                  className={`progress-fill ${item.color}`}
                  style={{ width: `${item.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strengths & Areas for Improvement */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card-glow">
          <h3 className="text-lg font-semibold text-white mb-4">💪 Strengths</h3>
          <ul className="space-y-3">
            {[
              "Excellent essay structure and organization",
              "Strong understanding of biological concepts",
              "Clear and articulate written communication",
              "Consistent performance across assessments",
            ].map((strength, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-dark-300">
                <span className="text-green-400 mt-0.5">✓</span>
                {strength}
              </li>
            ))}
          </ul>
        </div>

        <div className="card-glow">
          <h3 className="text-lg font-semibold text-white mb-4">🎯 Areas for Improvement</h3>
          <ul className="space-y-3">
            {[
              "Review Newton's Third Law applications",
              "Practice quadratic equation solving",
              "Improve time management in timed assessments",
              "Work on pronunciation in voice responses",
            ].map((area, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-dark-300">
                <span className="text-yellow-400 mt-0.5">→</span>
                {area}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recent Feedback */}
      <div className="card-glow">
        <h2 className="text-xl font-semibold text-white mb-5">Recent AI Feedback</h2>
        <div className="space-y-4">
          {[
            {
              assessment: "Chapter 5 Quiz — Biology",
              feedback: "Great work on cell division! Your explanation of mitosis was clear and accurate. Consider adding more detail about the role of spindle fibers in future responses.",
              score: 88,
            },
            {
              assessment: "Midterm Exam — Algebra",
              feedback: "Strong performance on linear equations. The quadratic formula section needs more practice. Review the discriminant concept and try additional practice problems.",
              score: 72,
            },
          ].map((item, i) => (
            <div key={i} className="p-4 bg-dark-900/50 rounded-lg border border-dark-700/30">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-white">{item.assessment}</p>
                <span className={`text-sm font-bold ${item.score >= 80 ? "text-green-400" : "text-orange-400"}`}>
                  {item.score}%
                </span>
              </div>
              <p className="text-xs text-dark-400 leading-relaxed">{item.feedback}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
