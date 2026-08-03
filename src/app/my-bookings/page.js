'use client';

import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '@/context/AuthProvider';
import axiosPublic from '@/services/axiosPublic';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function MyBookingsPage() {
  const { user, loading: authLoading } = useContext(AuthContext);
  const router = useRouter();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      toast.error('Please login to view your booked sessions');
      router.push('/login');
    } else if (user?.email) {
      fetchMyBookings();
    }
  }, [user, authLoading, router]);

  const fetchMyBookings = async () => {
    try {
      setLoading(true);
      const res = await axiosPublic.get(`/bookings?email=${user.email}`);
      setBookings(res.data);
    } catch (error) {
      console.error('Error fetching my bookings:', error);
      toast.error('Failed to load your booked sessions');
    } finally {
      setLoading(false);
    }
  };

  // Update Status to Cancelled via PATCH
  const handleCancelBooking = async (id) => {
    const confirmCancel = window.confirm('Are you sure you want to cancel this booked session?');
    if (!confirmCancel) return;

    try {
      const res = await axiosPublic.patch(`/bookings/${id}`, { status: 'cancelled' });
      if (res.data.modifiedCount > 0 || res.data.acknowledged) {
        toast.success('Booking cancelled successfully!');
        // Locally update status to reflect without page reload
        setBookings(bookings.map((b) => (b._id === id ? { ...b, status: 'cancelled' } : b)));
      }
    } catch (error) {
      console.error('Cancel booking error:', error);
      toast.error('Failed to cancel booking');
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
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white mb-2">
          My Booked Sessions
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          View and manage all your scheduled online and offline tutor sessions.
        </p>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-16 bg-base-100 dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <p className="text-lg font-semibold text-slate-600 dark:text-slate-400 mb-4">
            You haven't booked any tutoring sessions yet.
          </p>
          <button
            onClick={() => router.push('/tutors')}
            className="btn bg-indigo-600 text-white hover:bg-indigo-700 rounded-xl px-6 border-none"
          >
            Explore Tutors
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto bg-base-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-2">
          <table className="table w-full">
            <thead>
              <tr className="bg-base-200/50 dark:bg-slate-900/50 text-slate-700 dark:text-slate-300">
                <th>Name</th>
                <th>Phone</th>
                <th>Tutor Name</th>
                <th>Email</th>
                <th className="text-center">Status</th>
                <th className="text-center">Cancel</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((item) => (
                <tr key={item._id} className="border-b border-slate-200 dark:border-slate-700 hover:bg-base-200/30">
                  {/* Student Name */}
                  <td className="font-semibold text-slate-800 dark:text-white">
                    {item.studentName || item.name || user?.displayName || 'Student'}
                  </td>

                  {/* Phone */}
                  <td className="text-slate-600 dark:text-slate-300 text-sm">
                    {item.phone || 'N/A'}
                  </td>

                  {/* Tutor Name */}
                  <td className="font-bold text-indigo-600 dark:text-indigo-400">
                    {item.tutorName || 'N/A'}
                  </td>

                  {/* Email */}
                  <td className="text-slate-600 dark:text-slate-300 text-sm">
                    {item.studentEmail || item.userEmail || item.email}
                  </td>

                  {/* Status Badge */}
                  <td className="text-center">
                    <span
                      className={`badge border-none font-semibold px-3 py-2 text-xs rounded-lg ${
                        item.status === 'cancelled'
                          ? 'bg-red-100 text-red-600 dark:bg-red-950/60 dark:text-red-300'
                          : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                      }`}
                    >
                      {item.status || 'Booked'}
                    </span>
                  </td>

                  {/* Cancel Button */}
                  <td className="text-center">
                    {item.status !== 'cancelled' ? (
                      <button
                        onClick={() => handleCancelBooking(item._id)}
                        className="btn btn-xs btn-outline border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-md font-bold"
                        title="Cancel Booking"
                      >
                        ✕
                      </button>
                    ) : (
                      <span className="text-slate-400 text-xs">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}