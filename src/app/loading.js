export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
      {/* DaisyUI Spinner / Custom CSS Pulse */}
      <div className="relative flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
        <div className="absolute w-8 h-8 bg-indigo-600/10 rounded-full animate-ping"></div>
      </div>
      
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400 animate-pulse">
        Loading MediQueue...
      </p>
    </div>
  );
}