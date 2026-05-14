import {
  Brain,
  ClipboardList,
  BarChart3,
  MessageSquare,
  Shield,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Grading",
    description:
      "Automatically grade open-ended answers, essays, and code submissions with high accuracy using state-of-the-art language models.",
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: ClipboardList,
    title: "Smart Assessment Builder",
    description:
      "Generate diverse question sets from any topic or document in seconds. Mix multiple choice, short answer, and essay questions effortlessly.",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: BarChart3,
    title: "Real-Time Analytics",
    description:
      "Track class performance, identify knowledge gaps, and monitor individual student progress with intuitive dashboards.",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: MessageSquare,
    title: "Instant Feedback",
    description:
      "Students receive detailed, constructive feedback immediately after submission — no waiting for manual grading.",
    color: "bg-orange-100 text-orange-600",
  },
  {
    icon: Shield,
    title: "Academic Integrity",
    description:
      "Built-in plagiarism detection and AI-generated content detection keep assessments fair and trustworthy.",
    color: "bg-red-100 text-red-600",
  },
  {
    icon: Zap,
    title: "Adaptive Learning Paths",
    description:
      "AI recommends personalised study resources and follow-up exercises based on each student's performance.",
    color: "bg-yellow-100 text-yellow-600",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Everything you need to assess smarter
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            A complete toolkit for modern educators and learners, backed by AI.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map(({ icon: Icon, title, description, color }) => (
            <div
              key={title}
              className="card hover:shadow-md transition-shadow duration-200 group"
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${color}`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
