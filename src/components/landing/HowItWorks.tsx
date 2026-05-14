const steps = [
  {
    step: "01",
    title: "Create an assessment",
    description:
      "Upload a document, paste a topic, or write questions manually. Our AI suggests question types and difficulty levels automatically.",
  },
  {
    step: "02",
    title: "Students take the test",
    description:
      "Share a link or embed in your LMS. Students complete the assessment on any device — no app download required.",
  },
  {
    step: "03",
    title: "AI grades instantly",
    description:
      "Submissions are graded in real time with detailed rubric-based scoring and personalised written feedback.",
  },
  {
    step: "04",
    title: "Review insights & improve",
    description:
      "Explore class-wide analytics, download reports, and let AI suggest improvements for your next assessment.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Up and running in minutes
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Four simple steps from setup to insights.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map(({ step, title, description }, index) => (
            <div key={step} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div
                  aria-hidden="true"
                  className="hidden lg:block absolute top-6 left-full w-full h-0.5 bg-primary-100 -translate-x-4 z-0"
                />
              )}

              <div className="relative z-10">
                <div className="w-12 h-12 bg-primary-600 text-white rounded-xl flex items-center justify-center text-sm font-bold mb-4">
                  {step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
