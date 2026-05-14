import Link from "next/link";
import { ArrowRight, Sparkles, TrendingUp, Users, Zap } from "lucide-react";

const stats = [
  { label: "Active students", value: "50K+", icon: Users },
  { label: "Assessments created", value: "200K+", icon: TrendingUp },
  { label: "AI accuracy", value: "98%", icon: Sparkles },
];

export default function HeroDark() {
  return (
    <section className="relative overflow-hidden pt-24 pb-32">
      {/* Animated background orbs */}
      <div className="glow-orb w-[600px] h-[600px] bg-primary-600 -top-40 -right-32 animate-float" />
      <div className="glow-orb w-[500px] h-[500px] bg-accent-600 -bottom-20 -left-32 animate-float" style={{ animationDelay: "2s" }} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-primary-500/10 border border-primary-500/30 text-primary-300 text-sm font-medium px-4 py-2 rounded-full mb-8 animate-slide-up backdrop-blur-sm">
          <Sparkles className="w-4 h-4" />
          Powered by advanced AI
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight max-w-5xl mx-auto animate-slide-up">
          <span className="text-white">Smarter assessments.</span>
          <br />
          <span className="gradient-text">Better outcomes.</span>
        </h1>

        <p className="mt-8 text-xl sm:text-2xl text-dark-300 max-w-3xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: "0.1s" }}>
          EduAI helps teachers create AI-graded assessments in minutes and gives
          students instant, personalized feedback — so everyone can focus on
          learning.
        </p>

        {/* CTAs */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <Link
            href="/register"
            className="btn-primary flex items-center gap-2 text-lg px-8 py-4 group"
          >
            Start for free
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="#how-it-works"
            className="btn-secondary flex items-center gap-2 text-lg px-8 py-4"
          >
            <Zap className="w-5 h-5" />
            See how it works
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: "0.3s" }}>
          {stats.map(({ label, value, icon: Icon }) => (
            <div key={label} className="glass-card flex flex-col items-center gap-3 hover:border-primary-500/30 transition-all">
              <div className="w-12 h-12 bg-primary-500/20 rounded-xl flex items-center justify-center border border-primary-500/30">
                <Icon className="w-6 h-6 text-primary-400" />
              </div>
              <span className="text-4xl font-bold text-white">{value}</span>
              <span className="text-sm text-dark-400">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
