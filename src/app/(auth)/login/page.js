'use client';

import { useContext, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/context/AuthProvider';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const { signInUser, googleSignIn } = useContext(AuthContext);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    setError('');
    signInUser(email, password)
      .then(() => {
        toast.success('Login Successful!');
        router.push('/');
      })
      .catch((err) => {
        setError(err.message);
        toast.error('Failed to login!');
      });
  };

  const handleGoogleLogin = () => {
    googleSignIn()
      .then(() => {
        toast.success('Google Login Successful!');
        router.push('/');
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl border">
        <form onSubmit={handleLogin} className="card-body">
          <h2 className="text-2xl font-bold text-center text-primary mb-4">Login to MediQueue</h2>
          
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <div className="form-control">
            <label className="label"><span className="label-text">Email</span></label>
            <input type="email" name="email" placeholder="email@example.com" className="input input-bordered" required />
          </div>

          <div className="form-control mt-2">
            <label className="label"><span className="label-text">Password</span></label>
            <input type="password" name="password" placeholder="••••••••" className="input input-bordered" required />
          </div>

          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary">Login</button>
          </div>

          <div className="divider">OR</div>

          <button type="button" onClick={handleGoogleLogin} className="btn btn-outline btn-secondary">
            Continue with Google
          </button>

          <p className="text-center text-sm mt-4">
            Don't have an account? <Link href="/register" className="text-primary font-bold hover:underline">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
}