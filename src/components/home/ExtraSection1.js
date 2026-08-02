export default function ExtraSection1() {
  const features = [
    {
      id: 1,
      icon: "🎯",
      title: "Zero Slot Conflict",
      description: "Our automated digital token system ensures you never book an already taken time slot."
    },
    {
      id: 2,
      icon: "👨‍🏫",
      title: "Verified Tutors",
      description: "All instructors undergo quality verification so you get top-notch learning guidance."
    },
    {
      id: 3,
      icon: "⚡",
      title: "Instant Confirmation",
      description: "Book sessions in seconds with real-time availability updates directly from our database."
    },
    {
      id: 4,
      icon: "💻",
      title: "Flexible Learning",
      description: "Choose between Online, Offline, or Hybrid teaching modes based on your convenience."
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-16 my-8 bg-base-200/50 dark:bg-slate-800/40 rounded-3xl">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white mb-3">
          Why Choose MediQueue?
        </h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          We streamline the entire learning experience with dynamic slot booking, reliable tutor matching, and zero scheduling hassles.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature) => (
          <div 
            key={feature.id}
            className="bg-base-100 dark:bg-slate-800 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all border border-slate-200 dark:border-slate-700 flex flex-col items-center text-center"
          >
            <div className="text-4xl mb-4 p-3 bg-indigo-50 dark:bg-indigo-950/50 rounded-2xl w-fit">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
              {feature.title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}