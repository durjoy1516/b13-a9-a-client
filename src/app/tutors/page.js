'use client';

import { useState, useEffect, useMemo } from 'react';
import axiosPublic from '@/services/axiosPublic';
import TutorCard from '@/components/tutor/TutorCard';
import TutorFilter from '@/components/tutor/TutorFilter';
import Spinner from '@/components/shared/Spinner';

export default function AllTutorsPage() {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');

  // প্রথমবার সব টিউটর ডাটা ফেচ করা
  useEffect(() => {
    fetchTutors();
  }, []);

  const fetchTutors = async () => {
    try {
      setLoading(true);
      // মূল API তে কল দিয়ে সব ডাটা নিয়ে আসা
      const res = await axiosPublic.get('/tutors');
      setTutors(res.data);
    } catch (error) {
      console.error("Error loading tutors:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔍 ফ্রন্টএন্ড ক্লায়েন্ট-সাইড ফিল্টারিং এবং সর্টিং
  const filteredAndSortedTutors = useMemo(() => {
    let result = [...tutors];

    // ১. সার্চ হ্যান্ডলিং (Name, Subject বা Location দিয়ে সার্চ)
    if (search.trim() !== '') {
      const query = search.toLowerCase();
      result = result.filter((tutor) => {
        const nameMatch = tutor.name?.toLowerCase().includes(query);
        const subjectMatch = tutor.subject?.toLowerCase().includes(query);
        const locationMatch = tutor.location?.toLowerCase().includes(query);
        return nameMatch || subjectMatch || locationMatch;
      });
    }

    // ২. সর্টিং হ্যান্ডলিং (Low to High / High to Low)
    if (sort === 'asc' || sort === 'lowToHigh' || sort === 'low-to-high') {
      result.sort((a, b) => Number(a.hourlyRate || a.price || 0) - Number(b.hourlyRate || b.price || 0));
    } else if (sort === 'desc' || sort === 'highToLow' || sort === 'high-to-low') {
      result.sort((a, b) => Number(b.hourlyRate || b.price || 0) - Number(a.hourlyRate || a.price || 0));
    }

    return result;
  }, [tutors, search, sort]);

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
      ) : filteredAndSortedTutors.length === 0 ? (
        <div className="text-center py-16 bg-base-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
          <p className="text-lg font-semibold text-slate-600 dark:text-slate-400">
            No tutors found matching your search.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAndSortedTutors.map((tutor) => (
            <TutorCard key={tutor._id?.$oid || tutor._id} tutor={tutor} />
          ))}
        </div>
      )}
    </div>
  );
}