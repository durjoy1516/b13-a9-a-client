export default function ExtraSection2() {
  const steps = [
    {
      step: "01",
      title: "Find Your Ideal Tutor",
      description: "Browse tutors by subject, availability, rating, and teaching mode (Online or Offline)."
    },
    {
      step: "02",
      title: "Select & Book Session",
      description: "Check available date slots and instantly book your session without any schedule overlapping."
    },
    {
      step: "03",
      title: "Start Learning",
      description: "Receive your booking confirmation token and connect directly with your instructor."
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-16 mb-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white mb-3">
          How MediQueue Works
        </h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          Get started with expert tutoring in three simple steps.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((item, index) => (
          <div 
            key={index}
            className="relative bg-base-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all"
          >
            <span className="text-5xl font-extrabold text-indigo-500/20 dark:text-indigo-400/20 absolute top-4 right-6 select-none">
              {item.step}
            </span>
            <div className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center font-bold mb-6">
              {index + 1}
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">
              {item.title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}