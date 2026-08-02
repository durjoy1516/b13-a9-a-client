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
      const res = await axiosPublic.get(`/my-bookings?email=${user.email}`);
      setBookings(res.data);
    } catch (error) {
      console.error('Error fetching my bookings:', error);
      toast.error('Failed to load your booked sessions');
    } finally {
      setLoading(false);
    }
  };

  // Cancel / Delete Booking
  const handleCancelBooking = async (id) => {
    const confirmCancel = window.confirm('Are you sure you want to cancel this booked session?');
    if (!confirmCancel) return;

    try {
      const res = await axiosPublic.delete(`/bookings/${id}`);
      if (res.data.deletedCount > 0 || res.data.success) {
        toast.success('Booking cancelled successfully!');
        setBookings(bookings.filter((b) => b._id !== id));
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
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white mb-2">
          My Booked Sessions
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          View and manage all your scheduled online and offline tutor sessions.
        </p>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-16 bg-base-100 dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700">
          <p className="text-lg font-semibold text-slate-600 dark:text-slate-400 mb-4">
            You haven't booked any tutoring sessions yet.
          </p>
          <button
            onClick={() => router.push('/tutors')}
            className="btn btn-indigo bg-indigo-600 text-white hover:bg-indigo-700 rounded-xl"
          >
            Explore Tutors
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto bg-base-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <table className="table w-full">
            <thead>
              <tr className="bg-base-200/50 dark:bg-slate-900/50 text-slate-700 dark:text-slate-300">
                <th>#</th>
                <th>Tutor Info</th>
                <th>Subject</th>
                <th>Scheduled Date & Time</th>
                <th>Fee</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((item, index) => (
                <tr key={item._id} className="border-b border-slate-200 dark:border-slate-700">
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="w-12 h-12 rounded-xl">
                          <img src={item.tutorImage || 'https://via.placeholder.com/150'} alt={item.tutorName} />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-slate-800 dark:text-white">{item.tutorName}</div>
                      </div>
                    </div>
                  </td>
                  <td className="font-medium text-emerald-600 dark:text-emerald-400">{item.subject}</td>
                  <td className="text-slate-700 dark:text-slate-300">
                    <div className="font-semibold">{item.bookingDate}</div>
                    <div className="text-xs text-slate-500">{item.bookingTime}</div>
                  </td>
                  <td className="font-bold text-indigo-600 dark:text-indigo-400">{item.price} BDT</td>
                  <td>
                    <span className="badge badge-success bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-semibold border-none">
                      {item.status || 'Booked'}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => handleCancelBooking(item._id)}
                      className="btn btn-sm btn-outline border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-lg"
                    >
                      Cancel Booking
                    </button>
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