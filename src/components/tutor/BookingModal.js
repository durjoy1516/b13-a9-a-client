'use client';

import { useState, useContext } from 'react';
import { AuthContext } from '@/context/AuthProvider';
import axiosPublic from '@/services/axiosPublic';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function BookingModal({ tutor, isOpen, onClose }) {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleBooking = async (e) => {
    e.preventDefault();

    // 1. Check Slot Availability
    if (!tutor?.totalSlot || Number(tutor.totalSlot) <= 0) {
      toast.error("No available slots left for this tutor!");
      return;
    }

    // 2. Check Session Start Date Restriction
    const today = new Date().toISOString().split('T')[0];
    if (tutor?.sessionStartDate && today < tutor.sessionStartDate) {
      toast.error(`Booking is not available yet! Session starts on ${tutor.sessionStartDate}`);
      return;
    }

    setLoading(true);

    // Prepare Assignment Required Booking Payload
    const bookingData = {
      tutorId: tutor?._id,
      tutorName: tutor?.name,
      subject: tutor?.subject,
      hourlyRate: tutor?.hourlyRate || tutor?.price || 0,
      studentName: user?.displayName || 'Student',
      studentEmail: user?.email, // auto-filled
      userEmail: user?.email,    // backend query match
      phone: phone,
      bookingDate: new Date().toISOString(),
      status: 'Booked'
    };

    try {
      // API call to backend /bookings
      const res = await axiosPublic.post('/bookings', bookingData);

      if (res.data.insertedId || res.data.acknowledged) {
        toast.success(`Successfully booked session with ${tutor?.name}!`);
        onClose();
        // Redirecting to My Booked Sessions Page
        router.push('/my-booked-sessions');
      }
    } catch (error) {
      console.error('Booking Error:', error);
      toast.error(error.response?.data?.message || 'Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-base-100 dark:bg-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-700 relative">
        <button
          onClick={onClose}
          className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4"
        >
          ✕
        </button>

        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-1">
          Book Session
        </h3>
        <p className="text-xs text-indigo-600 font-semibold mb-4">
          Tutor: {tutor?.name} ({tutor?.subject})
        </p>

        <form onSubmit={handleBooking} className="space-y-4">
          {/* Auto-filled Student Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-xs">Student Name</span>
            </label>
            <input
              type="text"
              readOnly
              value={user?.displayName || 'Student'}
              className="input input-bordered rounded-xl bg-base-200/60 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
            />
          </div>

          {/* Auto-filled Student Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-xs">Student Email</span>
            </label>
            <input
              type="email"
              readOnly
              value={user?.email || ''}
              className="input input-bordered rounded-xl bg-base-200/60 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
            />
          </div>

          {/* Auto-filled Tutor ID & Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-xs">Tutor Name & ID</span>
            </label>
            <input
              type="text"
              readOnly
              value={`${tutor?.name} (${tutor?._id})`}
              className="input input-bordered rounded-xl bg-base-200/60 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
            />
          </div>

          {/* User Input: Phone Number */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-xs">Phone Number</span>
            </label>
            <input
              type="tel"
              required
              placeholder="e.g. +8801700000000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="input input-bordered rounded-xl focus:outline-indigo-600"
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-ghost rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl border-none"
            >
              {loading ? 'Booking...' : 'Confirm Booking'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}