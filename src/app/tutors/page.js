'use client';

import { useState, useEffect } from 'react';
import axiosPublic from '@/services/axiosPublic';
import TutorCard from '@/components/tutor/TutorCard';
import TutorFilter from '@/components/tutor/TutorFilter';
import Spinner from '@/components/shared/Spinner';

export default function AllTutorsPage() {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');

  useEffect(() => {
    fetchTutors();
  }, [search, sort]);

  const fetchTutors = async () => {
    try {
      setLoading(true);
      const res = await axiosPublic.get(`/tutors?search=${search}&sort=${sort}`);
      setTutors(res.data);
    } catch (error) {
      console.error("Error loading tutors:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Page Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 dark:text-white mb-3">
          Find All Qualified Tutors
        </h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          Search by tutor name or subject and filter according to your learning needs.
        </p>
      </div>

      {/* Filter Component (Search & Sort) */}
      <TutorFilter 
        search={search} 
        setSearch={setSearch} 
        sort={sort} 
        setSort={setSort} 
      />

      {/* Tutors Grid / Loading State */}
      {loading ? (
        <Spinner message="Fetching tutors list..." />
      ) : tutors.length === 0 ? (
        <div className="text-center py-16 bg-base-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
          <p className="text-lg font-semibold text-slate-600 dark:text-slate-400">
            No tutors found matching your search.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tutors.map((tutor) => (
            <TutorCard key={tutor._id} tutor={tutor} />
          ))}
        </div>
      )}
    </div>
  );
}