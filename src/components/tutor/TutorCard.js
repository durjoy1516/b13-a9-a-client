'use client';

import Link from 'next/link';

export default function TutorCard({ tutor }) {
  const { _id, name, image, subject, institution, hourlyRate, price, rating } = tutor || {};

  return (
    <div className="bg-base-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between">
      <div>
        <div className="relative overflow-hidden rounded-xl mb-4 h-48">
          <img
            src={image || 'https://via.placeholder.com/300'}
            alt={name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
          <span className="absolute top-3 right-3 bg-white/90 dark:bg-slate-900/90 text-amber-500 font-bold px-2.5 py-1 rounded-lg text-xs backdrop-blur-md shadow-sm flex items-center gap-1">
            ⭐ {rating || '4.9'}
          </span>
        </div>

        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-1">
          {name}
        </h3>

        <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-1">
          Subject: {subject}
        </p>

        <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
          {institution || 'Qualified Educator'}
        </p>

        <div className="flex justify-between items-center mb-4 pt-2 border-t border-slate-100 dark:border-slate-700/50">
          <span className="text-xs text-slate-400">Hourly Rate</span>
          <span className="text-base font-bold text-emerald-600 dark:text-emerald-400">
            {hourlyRate || price || '0'} BDT/hr
          </span>
        </div>
      </div>

      <Link
        href={`/tutors/${_id}`}
        className="w-full block text-center bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-xl font-medium transition-colors"
      >
        View Details & Book
      </Link>
    </div>
  );
}