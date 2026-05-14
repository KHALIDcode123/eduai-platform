const testimonials = [
  {
    quote:
      "EduAI cut my grading time by 80%. I can now spend that time actually helping students who are struggling instead of marking papers.",
    name: "Sarah Johnson",
    role: "High School Biology Teacher",
    initials: "SJ",
    color: "bg-purple-100 text-purple-700",
  },
  {
    quote:
      "The instant feedback is a game-changer. I used to wait a week to find out where I went wrong. Now I know immediately and can fix my understanding.",
    name: "Marcus Chen",
    role: "University Student, Computer Science",
    initials: "MC",
    color: "bg-blue-100 text-blue-700",
  },
  {
    quote:
      "We rolled out EduAI across our entire district. Teacher satisfaction is up, and standardised test scores improved by 12% in the first semester.",
    name: "Dr. Patricia Williams",
    role: "District Curriculum Director",
    initials: "PW",
    color: "bg-green-100 text-green-700",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Loved by educators and students
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Hear from the people using EduAI every day.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map(({ quote, name, role, initials, color }) => (
            <div key={name} className="card flex flex-col gap-4">
              {/* Quote */}
              <p className="text-gray-600 text-sm leading-relaxed flex-1">
                &ldquo;{quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${color}`}
                >
                  {initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{name}</p>
                  <p className="text-xs text-gray-500">{role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
