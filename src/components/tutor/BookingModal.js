'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

export default function BookingModal({ tutor, isOpen, onClose }) {
  const [bookingDate, setBookingDate] = useState('');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleBooking = (e) => {
    e.preventDefault();
    
    // Booking Logic backend API call logic target
    toast.success(`Booking request sent for ${tutor?.name}!`);
    onClose();
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
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Select Date & Time</span>
            </label>
            <input
              type="datetime-local"
              required
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
              className="input input-bordered rounded-xl"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Additional Notes</span>
            </label>
            <textarea
              placeholder="Mention topics you want to cover..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="textarea textarea-bordered rounded-xl h-24"
            ></textarea>
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
              className="btn bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl border-none"
            >
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}