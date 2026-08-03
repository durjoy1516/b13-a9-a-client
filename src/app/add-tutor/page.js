'use client';

import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '@/context/AuthProvider';
import axiosPublic from '@/services/axiosPublic';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function AddTutorPage() {
  const { user, loading: authLoading } = useContext(AuthContext);
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    institution: '',
    hourlyRate: '',
    image: '',
    experience: '',
    totalSlot: 5, // ডিফল্ট স্লট সংখ্যা
    teachingMode: 'Online',
    sessionStartDate: new Date().toISOString().split('T')[0], // YYYY-MM-DD
    bio: ''
  });
  const [submitting, setSubmitting] = useState(false);

  // Private route check
  useEffect(() => {
    if (!authLoading && !user) {
      toast.error('Please login to access this page');
      router.push('/login');
    } else if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.displayName || '',
      }));
    }
  }, [user, authLoading, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error('You must be logged in!');
      return;
    }

    const tutorData = {
      ...formData,
      hourlyRate: Number(formData.hourlyRate),
      totalSlot: Number(formData.totalSlot),
      email: user.email,       // <--- My Tutors পেজে ডাটা ম্যাকিংয়ের জন্য আবশ্যক
      userEmail: user.email,   // ব্যাকএন্ড ব্যাকআপ
      rating: 5.0,
      createdAt: new Date().toISOString()
    };

    try {
      setSubmitting(true);
      const res = await axiosPublic.post('/tutors', tutorData);
      if (res.data.insertedId || res.data.acknowledged) {
        toast.success('Tutor profile created successfully!');
        router.push('/my-tutors');
      }
    } catch (error) {
      console.error('Error adding tutor:', error);
      toast.error('Failed to add tutor profile.');
    } finally {
      setSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-indigo-600"></span>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="bg-base-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 md:p-10 shadow-xl">
        <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white mb-2 text-center">
          Add New Tutor Listing
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 text-center mb-8">
          Offer your tutoring services to thousands of eager students.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="label text-sm font-semibold text-slate-700 dark:text-slate-300">Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Tutor Full Name"
                className="input input-bordered w-full rounded-xl focus:outline-indigo-600"
              />
            </div>

            <div>
              <label className="label text-sm font-semibold text-slate-700 dark:text-slate-300">User Email (Owner)</label>
              <input
                type="email"
                value={user?.email || ''}
                disabled
                className="input input-bordered w-full rounded-xl bg-base-200 dark:bg-slate-700"
              />
            </div>
          </div>

          {/* Subject & Hourly Rate */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="label text-sm font-semibold text-slate-700 dark:text-slate-300">Subject / Category</label>
              <input
                type="text"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                placeholder="e.g. Mathematics, Physics, English"
                className="input input-bordered w-full rounded-xl focus:outline-indigo-600"
              />
            </div>

            <div>
              <label className="label text-sm font-semibold text-slate-700 dark:text-slate-300">Hourly Rate (BDT / $)</label>
              <input
                type="number"
                name="hourlyRate"
                required
                value={formData.hourlyRate}
                onChange={handleChange}
                placeholder="e.g. 500"
                className="input input-bordered w-full rounded-xl focus:outline-indigo-600"
              />
            </div>
          </div>

          {/* Institution & Slots */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="label text-sm font-semibold text-slate-700 dark:text-slate-300">Institution / Qualification</label>
              <input
                type="text"
                name="institution"
                required
                value={formData.institution}
                onChange={handleChange}
                placeholder="e.g. Dhaka University"
                className="input input-bordered w-full rounded-xl focus:outline-indigo-600"
              />
            </div>

            <div>
              <label className="label text-sm font-semibold text-slate-700 dark:text-slate-300">Available Slots</label>
              <input
                type="number"
                name="totalSlot"
                required
                value={formData.totalSlot}
                onChange={handleChange}
                placeholder="e.g. 5"
                className="input input-bordered w-full rounded-xl focus:outline-indigo-600"
              />
            </div>
          </div>

          {/* Teaching Mode & Start Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="label text-sm font-semibold text-slate-700 dark:text-slate-300">Teaching Mode</label>
              <select
                name="teachingMode"
                value={formData.teachingMode}
                onChange={handleChange}
                className="select select-bordered w-full rounded-xl focus:outline-indigo-600"
              >
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
                <option value="Both">Both</option>
              </select>
            </div>

            <div>
              <label className="label text-sm font-semibold text-slate-700 dark:text-slate-300">Session Start Date</label>
              <input
                type="date"
                name="sessionStartDate"
                required
                value={formData.sessionStartDate}
                onChange={handleChange}
                className="input input-bordered w-full rounded-xl focus:outline-indigo-600"
              />
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="label text-sm font-semibold text-slate-700 dark:text-slate-300">Image URL</label>
            <input
              type="url"
              name="image"
              required
              value={formData.image}
              onChange={handleChange}
              placeholder="https://images.unsplash.com/photo-..."
              className="input input-bordered w-full rounded-xl focus:outline-indigo-600"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="label text-sm font-semibold text-slate-700 dark:text-slate-300">Bio / Description</label>
            <textarea
              name="bio"
              rows="4"
              required
              value={formData.bio}
              onChange={handleChange}
              placeholder="Describe your teaching style and expertise..."
              className="textarea textarea-bordered w-full rounded-xl focus:outline-indigo-600"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3.5 rounded-xl shadow-lg transition-all cursor-pointer text-center text-base"
          >
            {submitting ? 'Adding Tutor Profile...' : 'Submit Tutor Profile'}
          </button>
        </form>
      </div>
    </div>
  );
}