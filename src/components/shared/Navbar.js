'use client';

import Link from 'next/link';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthProvider';
import toast from 'react-hot-toast';

export default function Navbar() {
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then(() => toast.success('Logged out successfully!'))
      .catch((err) => toast.error(err.message));
  };

  const navLinks = (
    <>
      <li><Link href="/">Home</Link></li>
      <li><Link href="/tutors">Find Tutors</Link></li>
      {user && (
        <>
          <li><Link href="/add-tutor">Add Tutor</Link></li>
          <li><Link href="/my-tutors">My Tutors</Link></li>
          <li><Link href="/my-bookings">My Bookings</Link></li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-md px-4 md:px-8 sticky top-0 z-50">
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
        <Link href="/" className="btn btn-ghost text-xl font-bold text-primary">
          MediQueue
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2 font-medium">
          {navLinks}
        </ul>
      </div>

      <div className="navbar-end gap-3">
        {user ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  alt={user?.displayName || 'User Profile'}
                  src={user?.photoURL || 'https://i.ibb.co/mR4Xp6L/user.png'}
                />
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li className="px-4 py-2 font-semibold text-gray-700">{user?.displayName || 'User'}</li>
              <hr className="my-1" />
              <li><button onClick={handleLogOut} className="text-red-500 font-medium">Logout</button></li>
            </ul>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link href="/login" className="btn btn-outline btn-primary btn-sm">Login</Link>
            <Link href="/register" className="btn btn-primary btn-sm">Register</Link>
          </div>
        )}
      </div>
    </div>
  );
}