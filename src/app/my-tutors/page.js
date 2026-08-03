'use client';

import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '@/context/AuthProvider';
import axiosPublic from '@/services/axiosPublic';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function MyTutorsPage() {
  const { user, loading: authLoading } = useContext(AuthContext);
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetchMyTutors();
    } else if (!authLoading) {
      setLoading(false);
    }
  }, [user, authLoading]);

  const fetchMyTutors = async () => {
    try {
      setLoading(true);
      // Backend api endpoint: /my-tutors?email=...
      const res = await axiosPublic.get(`/my-tutors?email=${user.email}`);
      setTutors(res.data);
    } catch (error) {
      console.error('Error fetching my tutors:', error);
      toast.error('Failed to load your added tutors');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTutor = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this tutor?');
    if (!confirmDelete) return;

    try {
      const res = await axiosPublic.delete(`/tutors/${id}`);
      if (res.data.deletedCount > 0) {
        toast.success('Tutor deleted successfully');
        setTutors(tutors.filter((tutor) => tutor._id !== id));
      }
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete tutor');
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-indigo-600"></span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 min-h-[70vh]">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white mb-2">
            My Added Tutors
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Manage and update the tutor sessions you have created.
          </p>
        </div>
        <Link
          href="/add-tutor"
          className="btn bg-indigo-600 hover:bg-indigo-700 text-white border-none rounded-xl px-5"
        >
          + Add New Tutor
        </Link>
      </div>

      {tutors.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <p className="text-lg font-semibold text-slate-600 dark:text-slate-400 mb-4">
            You haven't added any tutor sessions yet.
          </p>
          <Link
            href="/add-tutor"
            className="btn bg-indigo-600 text-white hover:bg-indigo-700 rounded-xl px-6 border-none"
          >
            Add Your First Tutor
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutors.map((tutor) => (
            <div
              key={tutor._id}
              className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <img
                  src={tutor.image || 'https://via.placeholder.com/150'}
                  alt={tutor.name}
                  className="w-full h-44 object-cover rounded-xl mb-4"
                />
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-1">
                  {tutor.name}
                </h3>
                <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
                  {tutor.subject}
                </p>
                <div className="text-xs text-slate-500 space-y-1 mb-4">
                  <p><span className="font-semibold text-slate-700 dark:text-slate-300">Rate:</span> ${tutor.hourlyRate}/hr</p>
                  <p><span className="font-semibold text-slate-700 dark:text-slate-300">Slots:</span> {tutor.totalSlot}</p>
                  <p><span className="font-semibold text-slate-700 dark:text-slate-300">Mode:</span> {tutor.teachingMode}</p>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t border-slate-100 dark:border-slate-700">
                <Link
                  href={`/update-tutor/${tutor._id}`}
                  className="btn btn-sm btn-outline btn-info flex-1 rounded-lg"
                >
                  Update
                </Link>
                <button
                  onClick={() => handleDeleteTutor(tutor._id)}
                  className="btn btn-sm btn-outline btn-error flex-1 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}