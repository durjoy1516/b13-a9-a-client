export default function SectionTitle({ title, subtitle, center = true }) {
  return (
    <div className={`mb-10 ${center ? 'text-center' : 'text-left'}`}>
      <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 dark:text-white tracking-tight mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      <div className={`mt-3 h-1 w-20 bg-indigo-600 rounded-full ${center ? 'mx-auto' : ''}`}></div>
    </div>
  );
}