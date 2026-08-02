'use client';

import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '@/context/AuthProvider';
import axiosPublic from '@/services/axiosPublic';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function MyTutorsPage() {
  const { user, loading: authLoading } = useContext(AuthContext);
  const router = useRouter();

  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTutor, setEditingTutor] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      toast.error('Please login to view your added tutors');
      router.push('/login');
    } else if (user?.email) {
      fetchMyTutors();
    }
  }, [user, authLoading, router]);

  const fetchMyTutors = async () => {
    try {
      setLoading(true);
      const res = await axiosPublic.get(`/my-tutors?email=${user.email}`);
      setTutors(res.data);
    } catch (error) {
      console.error('Error fetching my tutors:', error);
      toast.error('Failed to load your tutors');
    } finally {
      setLoading(false);
    }
  };

  // Delete Tutor
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this tutor listing?');
    if (!confirmDelete) return;

    try {
      const res = await axiosPublic.delete(`/tutors/${id}`);
      if (res.data.deletedCount > 0 || res.data.success) {
        toast.success('Tutor profile deleted!');
        setTutors(tutors.filter((t) => t._id !== id));
      }
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete tutor profile');
    }
  };

  // Update Tutor Submit
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      setUpdateLoading(true);
      const res = await axiosPublic.put(`/tutors/${editingTutor._id}`, {
        name: editingTutor.name,
        subject: editingTutor.subject,
        hourlyRate: Number(editingTutor.hourlyRate),
        institution: editingTutor.institution,
        image: editingTutor.image,
        bio: editingTutor.bio,
      });

      if (res.data.modifiedCount > 0 || res.data.success) {
        toast.success('Tutor profile updated successfully!');
        setEditingTutor(null);
        fetchMyTutors();
      } else {
        toast.error('No changes were made.');
      }
    } catch (error) {
      console.error('Update error:', error);
      toast.error('Failed to update tutor profile');
    } finally {
      setUpdateLoading(false);
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
          My Added Tutors
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Manage, update, or remove the tutor listings you have posted.
        </p>
      </div>

      {tutors.length === 0 ? (
        <div className="text-center py-16 bg-base-100 dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700">
          <p className="text-lg font-semibold text-slate-600 dark:text-slate-400 mb-4">
            You haven't added any tutors yet.
          </p>
          <button
            onClick={() => router.push('/add-tutor')}
            className="btn btn-indigo bg-indigo-600 text-white hover:bg-indigo-700 rounded-xl"
          >
            Add Your First Tutor
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
                <th>Rate (BDT/hr)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tutors.map((item, index) => (
                <tr key={item._id} className="border-b border-slate-200 dark:border-slate-700">
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="w-12 h-12 rounded-xl">
                          <img src={item.image || 'https://via.placeholder.com/150'} alt={item.name} />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-slate-800 dark:text-white">{item.name}</div>
                        <div className="text-xs text-slate-500">{item.institution || 'N/A'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="font-medium text-emerald-600 dark:text-emerald-400">{item.subject}</td>
                  <td className="font-bold text-indigo-600 dark:text-indigo-400">{item.hourlyRate || item.price} BDT</td>
                  <td>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingTutor(item)}
                        className="btn btn-sm btn-outline border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white rounded-lg"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="btn btn-sm btn-outline border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-lg"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit / Update Modal */}
      {editingTutor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-base-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setEditingTutor(null)}
              className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4"
            >
              ✕
            </button>

            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
              Update Tutor Details
            </h3>

            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <div>
                <label className="label text-xs font-semibold text-slate-500">Name</label>
                <input
                  type="text"
                  required
                  value={editingTutor.name}
                  onChange={(e) => setEditingTutor({ ...editingTutor, name: e.target.value })}
                  className="input input-bordered w-full rounded-xl focus:outline-indigo-600"
                />
              </div>

              <div>
                <label className="label text-xs font-semibold text-slate-500">Subject</label>
                <input
                  type="text"
                  required
                  value={editingTutor.subject}
                  onChange={(e) => setEditingTutor({ ...editingTutor, subject: e.target.value })}
                  className="input input-bordered w-full rounded-xl focus:outline-indigo-600"
                />
              </div>

              <div>
                <label className="label text-xs font-semibold text-slate-500">Hourly Rate (BDT)</label>
                <input
                  type="number"
                  required
                  value={editingTutor.hourlyRate}
                  onChange={(e) => setEditingTutor({ ...editingTutor, hourlyRate: e.target.value })}
                  className="input input-bordered w-full rounded-xl focus:outline-indigo-600"
                />
              </div>

              <div>
                <label className="label text-xs font-semibold text-slate-500">Institution</label>
                <input
                  type="text"
                  value={editingTutor.institution || ''}
                  onChange={(e) => setEditingTutor({ ...editingTutor, institution: e.target.value })}
                  className="input input-bordered w-full rounded-xl focus:outline-indigo-600"
                />
              </div>

              <div>
                <label className="label text-xs font-semibold text-slate-500">Image URL</label>
                <input
                  type="url"
                  required
                  value={editingTutor.image}
                  onChange={(e) => setEditingTutor({ ...editingTutor, image: e.target.value })}
                  className="input input-bordered w-full rounded-xl focus:outline-indigo-600"
                />
              </div>

              <div>
                <label className="label text-xs font-semibold text-slate-500">Bio / Description</label>
                <textarea
                  rows="3"
                  value={editingTutor.bio || ''}
                  onChange={(e) => setEditingTutor({ ...editingTutor, bio: e.target.value })}
                  className="textarea textarea-bordered w-full rounded-xl focus:outline-indigo-600"
                ></textarea>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setEditingTutor(null)}
                  className="btn btn-ghost flex-1 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updateLoading}
                  className="btn btn-indigo bg-indigo-600 hover:bg-indigo-700 text-white flex-1 rounded-xl"
                >
                  {updateLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}