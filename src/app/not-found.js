'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="relative mb-6">
        <h1 className="text-9xl font-extrabold text-indigo-600/20 dark:text-indigo-400/10 tracking-widest">
          404
        </h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white">
            Page Not Found
          </span>
        </div>
      </div>

      <p className="text-slate-600 dark:text-slate-400 text-lg max-w-md mb-8">
        Oops! The page you are looking for doesn't exist, has been removed, or is temporarily unavailable.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="btn btn-primary bg-indigo-600 hover:bg-indigo-700 text-white border-none rounded-xl px-8 shadow-lg shadow-indigo-500/20"
        >
          Back to Home
        </Link>
        <Link
          href="/tutors"
          className="btn btn-outline border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl px-8"
        >
          Find Tutors
        </Link>
      </div>
    </div>
  );
}