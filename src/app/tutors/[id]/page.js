'use client';

import { useState, useEffect, useContext, use } from 'react';
import { AuthContext } from '@/context/AuthProvider';
import axiosPublic from '@/services/axiosPublic';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function TutorDetailsPage({ params: paramsPromise }) {
  // Next.js params unwrap
  const params = use(paramsPromise);
  const tutorId = params.id;

  const { user } = useContext(AuthContext);
  const router = useRouter();

  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    if (tutorId) {
      fetchTutorDetails();
    }
  }, [tutorId]);

  const fetchTutorDetails = async () => {
    try {
      setLoading(true);
      const res = await axiosPublic.get(`/tutors/${tutorId}`);
      setTutor(res.data);
    } catch (error) {
      console.error("Error fetching tutor details:", error);
      toast.error("Failed to load tutor details");
    } finally {
      setLoading(false);
    }
  };

  const handleBookSession = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login to book a session");
      router.push('/login');
      return;
    }

    if (!bookingDate || !bookingTime) {
      toast.error("Please select both date and time");
      return;
    }

    const bookingData = {
      tutorId: tutor._id,
      tutorName: tutor.name,
      tutorImage: tutor.image,
      subject: tutor.subject,
      price: tutor.hourlyRate || tutor.price,
      studentName: user.displayName,
      studentEmail: user.email,
      bookingDate,
      bookingTime,
      status: 'Booked',
      createdAt: new Date().toISOString()
    };

    try {
      setBookingLoading(true);
      const res = await axiosPublic.post('/bookings', bookingData);
      
      if (res.data.insertedId || res.data.success) {
        toast.success("Session booked successfully!");
        setIsModalOpen(false);
        router.push('/my-bookings');
      }
    } catch (error) {
      console.error("Booking Error:", error);
      toast.error(error.response?.data?.message || "Failed to book session");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-indigo-600"></span>
      </div>
    );
  }

  if (!tutor) {
    return (
      <div className="text-center py-20 text-slate-500">
        Tutor details not found.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Main Details Card */}
      <div className="bg-base-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 md:p-10 shadow-xl grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left: Tutor Image & Quick Info */}
        <div className="flex flex-col items-center text-center">
          <img 
            src={tutor.image || 'https://via.placeholder.com/300'} 
            alt={tutor.name} 
            className="w-48 h-48 md:w-full md:h-64 object-cover rounded-2xl shadow-md mb-4"
          />
          <span className="badge badge-indigo bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300 font-bold px-4 py-3 text-sm border-none mb-2">
            ⭐ {tutor.rating || '4.9'} Rating
          </span>
          <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mt-2">
            {tutor.hourlyRate || tutor.price} BDT / hour
          </p>
        </div>

        {/* Right: Detailed Information */}
        <div className="md:col-span-2 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white mb-2">
              {tutor.name}
            </h1>
            <p className="text-lg font-semibold text-emerald-600 dark:text-emerald-400 mb-4">
              Subject: {tutor.subject}
            </p>

            <div className="space-y-3 text-sm md:text-base text-slate-600 dark:text-slate-300 mb-6">
              <p><strong className="text-slate-800 dark:text-white">Qualifications/Institution:</strong> {tutor.institution || tutor.qualifications || 'N/A'}</p>
              <p><strong className="text-slate-800 dark:text-white">Teaching Experience:</strong> {tutor.experience || '3+ Years'}</p>
              <p><strong className="text-slate-800 dark:text-white">Teaching Mode:</strong> {tutor.mode || 'Online / Offline'}</p>
              <p><strong className="text-slate-800 dark:text-white">About Tutor:</strong></p>
              <p className="bg-base-200/50 dark:bg-slate-900/40 p-4 rounded-xl leading-relaxed text-slate-600 dark:text-slate-400">
                {tutor.bio || tutor.description || "Passionate educator dedicated to helping students grasp complex concepts through interactive and step-by-step guidance."}
              </p>
            </div>
          </div>

          {/* Book Session CTA */}
          <button
            onClick={() => {
              if (!user) {
                toast.error("Please login first!");
                router.push('/login');
              } else {
                setIsModalOpen(true);
              }
            }}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3.5 rounded-xl shadow-lg transition-all cursor-pointer text-center text-lg"
          >
            Book Session Now
          </button>
        </div>
      </div>

      {/* Booking Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-base-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl relative">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4"
            >
              ✕
            </button>

            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
              Confirm Booking
            </h3>

            <form onSubmit={handleBookSession} className="space-y-4">
              <div>
                <label className="label text-xs font-semibold text-slate-500">Tutor Name</label>
                <input type="text" value={tutor.name} disabled className="input input-bordered w-full bg-base-200 dark:bg-slate-700" />
              </div>

              <div>
                <label className="label text-xs font-semibold text-slate-500">Student Email</label>
                <input type="text" value={user?.email || ''} disabled className="input input-bordered w-full bg-base-200 dark:bg-slate-700" />
              </div>

              <div>
                <label className="label text-xs font-semibold text-slate-500">Select Date</label>
                <input 
                  type="date" 
                  required
                  value={bookingDate} 
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="input input-bordered w-full focus:outline-indigo-600"
                />
              </div>

              <div>
                <label className="label text-xs font-semibold text-slate-500">Select Time Slot</label>
                <input 
                  type="time" 
                  required
                  value={bookingTime} 
                  onChange={(e) => setBookingTime(e.target.value)}
                  className="input input-bordered w-full focus:outline-indigo-600"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="btn btn-ghost flex-1 rounded-xl"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={bookingLoading}
                  className="btn btn-indigo bg-indigo-600 hover:bg-indigo-700 text-white flex-1 rounded-xl"
                >
                  {bookingLoading ? 'Booking...' : 'Confirm Book'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}