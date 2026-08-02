'use client';

import Link from 'next/link';
import { useContext } from 'react';
// ✅ এখানে সঠিক ফাইল 'AuthProvider' দেওয়া হয়েছে
import { AuthContext } from '@/context/AuthProvider'; 
import ThemeToggle from '../theme/ThemeToggle';
import toast from 'react-hot-toast';

export default function Navbar() {
  const { user, logOut } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success('Successfully logged out!');
    } catch (error) {
      toast.error('Failed to log out');
    }
  };

  const navLinks = (
    <>
      <li><Link href="/">Home</Link></li>
      <li><Link href="/tutors">Tutors</Link></li>
      {user && (
        <>
          <li><Link href="/add-tutor">Add Tutor</Link></li>
          <li><Link href="/my-tutors">My Tutors</Link></li>
          <li><Link href="/my-bookings">My Booked Sessions</Link></li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-md sticky top-0 z-50 px-4 lg:px-8">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            {navLinks}
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost text-xl font-bold text-indigo-600">
          MediQueue
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-1">
          {navLinks}
        </ul>
      </div>

      <div className="navbar-end gap-3">
        <ThemeToggle />
        {user ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full ring ring-indigo-500 ring-offset-base-100 ring-offset-2">
                <img 
                  alt={user?.displayName || 'User Profile'} 
                  src={user?.photoURL || 'https://i.ibb.co/mR394y0/user-placeholder.png'} 
                />
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li className="px-4 py-2 font-semibold text-gray-700">{user?.displayName || 'User'}</li>
              <div className="divider my-0"></div>
              <li>
                <button onClick={handleLogout} className="text-red-500 hover:bg-red-50">Logout</button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link href="/login" className="btn btn-outline btn-indigo btn-sm">Login</Link>
            <Link href="/register" className="btn btn-indigo bg-indigo-600 text-white hover:bg-indigo-700 btn-sm">Register</Link>
          </div>
        )}
      </div>
    </div>
  );
}