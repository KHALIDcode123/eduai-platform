import Link from "next/link";
import { ArrowRight, Sparkles, TrendingUp, Users } from "lucide-react";

const stats = [
  { label: "Active students", value: "50K+", icon: Users },
  { label: "Assessments created", value: "200K+", icon: TrendingUp },
  { label: "AI accuracy", value: "98%", icon: Sparkles },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 via-white to-white pt-16 pb-24">
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -top-40 -right-32 w-[600px] h-[600px] rounded-full bg-primary-100 opacity-40 blur-3xl" />
        <div className="absolute -bottom-20 -left-32 w-[500px] h-[500px] rounded-full bg-secondary-100 opacity-40 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-primary-50 border border-primary-200 text-primary-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
          <Sparkles className="w-4 h-4" />
          Powered by advanced AI
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight max-w-4xl mx-auto">
          Smarter assessments.{" "}
          <span className="text-primary-600">Better outcomes.</span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
          EduAI helps teachers create AI-graded assessments in minutes and gives
          students instant, personalised feedback — so everyone can focus on
          learning.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/register"
            className="btn-primary flex items-center gap-2 text-base px-6 py-3"
          >
            Start for free
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="#how-it-works"
            className="btn-secondary flex items-center gap-2 text-base px-6 py-3"
          >
            See how it works
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
          {stats.map(({ label, value, icon: Icon }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                <Icon className="w-5 h-5 text-primary-600" />
              </div>
              <span className="text-3xl font-bold text-gray-900">{value}</span>
              <span className="text-sm text-gray-500">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
