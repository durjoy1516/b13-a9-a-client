'use client';

import { useState, useEffect } from 'react';

export default function TutorUpdateModal({ tutor, isOpen, onClose, onUpdateSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    hourlyRate: '',
    institution: '',
    image: '',
    bio: '',
    totalSlot: '',
    teachingMode: 'Online',
    sessionStartDate: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (tutor) {
      setFormData({
        name: tutor.name || '',
        subject: tutor.subject || '',
        hourlyRate: tutor.hourlyRate || '',
        institution: tutor.institution || '',
        image: tutor.image || '',
        bio: tutor.bio || '',
        totalSlot: tutor.totalSlot || '',
        teachingMode: tutor.teachingMode || 'Online',
        sessionStartDate: tutor.sessionStartDate || ''
      });
    }
  }, [tutor]);

  if (!isOpen || !tutor) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://tutor-finder-server-three.vercel.app'}/tutors/${tutor._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && (data.modifiedCount > 0 || data.matchedCount > 0)) {
        alert('Tutor info updated successfully!');
        onUpdateSuccess();
        onClose();
      } else {
        alert('No changes were made or update failed.');
      }
    } catch (error) {
      console.error('Update Error:', error);
      alert('Failed to update tutor info.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">Update Tutor Info</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-red-500 text-2xl font-bold"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white" 
              required 
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Subject</label>
            <input 
              type="text" 
              name="subject" 
              value={formData.subject} 
              onChange={handleChange} 
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white" 
              required 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Hourly Rate ($)</label>
              <input 
                type="number" 
                name="hourlyRate" 
                value={formData.hourlyRate} 
                onChange={handleChange} 
                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white" 
                required 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Total Slots</label>
              <input 
                type="number" 
                name="totalSlot" 
                value={formData.totalSlot} 
                onChange={handleChange} 
                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white" 
                required 
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Institution</label>
            <input 
              type="text" 
              name="institution" 
              value={formData.institution} 
              onChange={handleChange} 
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Image URL</label>
            <input 
              type="url" 
              name="image" 
              value={formData.image} 
              onChange={handleChange} 
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Teaching Mode</label>
            <select 
              name="teachingMode" 
              value={formData.teachingMode} 
              onChange={handleChange} 
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
            >
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
              <option value="Both">Both</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Session Start Date</label>
            <input 
              type="date" 
              name="sessionStartDate" 
              value={formData.sessionStartDate} 
              onChange={handleChange} 
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Bio</label>
            <textarea 
              name="bio" 
              value={formData.bio} 
              onChange={handleChange} 
              rows="3" 
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
            ></textarea>
          </div>

          <div className="flex justify-end space-x-3 pt-3 border-t">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-4 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={loading} 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {loading ? 'Updating...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}