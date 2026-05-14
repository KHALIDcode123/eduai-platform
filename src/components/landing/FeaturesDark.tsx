import {
  Brain,
  ClipboardList,
  BarChart3,
  MessageSquare,
  Shield,
  Mic,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Grading",
    description:
      "Automatically grade essays, short answers, and voice responses with rubric-guided AI evaluation that adapts to your teaching style.",
    color: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  },
  {
    icon: Mic,
    title: "Voice Response Analysis",
    description:
      "Students can submit spoken answers. AI transcribes, analyzes fluency, clarity, and provides pronunciation feedback.",
    color: "bg-pink-500/20 text-pink-400 border-pink-500/30",
  },
  {
    icon: ClipboardList,
    title: "Custom Rubric Builder",
    description:
      "Define grading criteria, expected concepts, sample answers, and common mistakes. AI adapts to your expectations.",
    color: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  },
  {
    icon: BarChart3,
    title: "Learning Analytics",
    description:
      "Track class performance, identify knowledge gaps, and monitor individual student progress with actionable insights.",
    color: "bg-green-500/20 text-green-400 border-green-500/30",
  },
  {
    icon: MessageSquare,
    title: "Instant Feedback",
    description:
      "Students receive detailed, constructive feedback immediately after submission with strengths, weaknesses, and improvement suggestions.",
    color: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  },
  {
    icon: Shield,
    title: "Teacher Control",
    description:
      "Teachers review all AI evaluations, manually adjust scores, add comments, and maintain final authority over grades.",
    color: "bg-red-500/20 text-red-400 border-red-500/30",
  },
];

export default function FeaturesDark() {
  return (
    <section id="features" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Everything you need to assess <span className="gradient-text">smarter</span>
          </h2>
          <p className="text-xl text-dark-300">
            A complete AI-assisted toolkit for modern educators and learners.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, description, color }) => (
            <div
              key={title}
              className="card-glow group hover:scale-105 transition-all duration-300"
            >
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 border ${color}`}
              >
                <Icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
              <p className="text-dark-400 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
