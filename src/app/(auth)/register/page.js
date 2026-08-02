'use client';

import { useContext, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/context/AuthProvider';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const { createUser, updateUserProfile, googleSignIn } = useContext(AuthContext);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const photoURL = e.target.photoURL.value;
    const password = e.target.password.value;

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setError('');
    createUser(email, password)
      .then(() => {
        updateUserProfile(name, photoURL)
          .then(() => {
            toast.success('Registration Successful!');
            router.push('/');
          });
      })
      .catch((err) => {
        setError(err.message);
        toast.error('Registration Failed!');
      });
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl border">
        <form onSubmit={handleRegister} className="card-body">
          <h2 className="text-2xl font-bold text-center text-primary mb-4">Create An Account</h2>
          
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <div className="form-control">
            <label className="label"><span className="label-text">Name</span></label>
            <input type="text" name="name" placeholder="John Doe" className="input input-bordered" required />
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text">Email</span></label>
            <input type="email" name="email" placeholder="email@example.com" className="input input-bordered" required />
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text">Photo URL</span></label>
            <input type="url" name="photoURL" placeholder="https://image-link.com" className="input input-bordered" required />
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text">Password</span></label>
            <input type="password" name="password" placeholder="••••••••" className="input input-bordered" required />
          </div>

          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary">Register</button>
          </div>

          <p className="text-center text-sm mt-4">
            Already have an account? <Link href="/login" className="text-primary font-bold hover:underline">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}