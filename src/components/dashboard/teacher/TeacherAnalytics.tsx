"use client";

import { BarChart3, TrendingUp, Users, Award } from "lucide-react";

export default function TeacherAnalytics() {
  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card-glow">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-500/20 border border-blue-500/30 rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">142</p>
              <p className="text-xs text-dark-400">Total Students</p>
            </div>
          </div>
        </div>

        <div className="card-glow">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-green-500/20 border border-green-500/30 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">78%</p>
              <p className="text-xs text-dark-400">Avg. Score</p>
            </div>
          </div>
        </div>

        <div className="card-glow">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-purple-500/20 border border-purple-500/30 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">24</p>
              <p className="text-xs text-dark-400">Assessments</p>
            </div>
          </div>
        </div>

        <div className="card-glow">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-yellow-500/20 border border-yellow-500/30 rounded-xl flex items-center justify-center">
              <Award className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">92%</p>
              <p className="text-xs text-dark-400">Completion Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card-glow">
          <h3 className="text-lg font-semibold text-white mb-4">Score Distribution</h3>
          <div className="h-64 flex items-center justify-center text-dark-500">
            <p>Chart visualization would go here</p>
          </div>
        </div>

        <div className="card-glow">
          <h3 className="text-lg font-semibold text-white mb-4">Performance Trends</h3>
          <div className="h-64 flex items-center justify-center text-dark-500">
            <p>Chart visualization would go here</p>
          </div>
        </div>
      </div>

      {/* Common Weak Areas */}
      <div className="card-glow">
        <h3 className="text-lg font-semibold text-white mb-4">Common Weak Areas</h3>
        <div className="space-y-3">
          {[
            { topic: "Newton's Third Law", percentage: 68, color: "bg-red-500" },
            { topic: "Quadratic Equations", percentage: 72, color: "bg-orange-500" },
            { topic: "Cell Division", percentage: 81, color: "bg-yellow-500" },
            { topic: "Essay Structure", percentage: 85, color: "bg-green-500" },
          ].map((item) => (
            <div key={item.topic}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-dark-300">{item.topic}</span>
                <span className="text-sm text-dark-400">{item.percentage}% mastery</span>
              </div>
              <div className="progress-bar h-2">
                <div
                  className={`progress-fill ${item.color}`}
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
