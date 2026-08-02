'use client';

import { useContext, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/context/AuthProvider';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const { signInUser, googleSignIn } = useContext(AuthContext);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    setError('');
    setLoading(true);

    signInUser(email, password)
      .then(() => {
        toast.success('Login Successful!');
        router.push('/');
      })
      .catch((err) => {
        setError(err.message);
        toast.error('Failed to login!');
      })
      .finally(() => setLoading(false));
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
      <div className="card w-full max-w-md bg-base-100 shadow-2xl border border-slate-200 dark:border-slate-700">
        <form onSubmit={handleLogin} className="card-body">
          <h2 className="text-2xl font-bold text-center text-indigo-600 dark:text-indigo-400 mb-2">
            Login to MediQueue
          </h2>
          <p className="text-xs text-center text-slate-500 mb-4">
            Welcome back! Please enter your details.
          </p>
          
          {error && <p className="text-red-500 text-sm text-center font-medium bg-red-50 p-2 rounded-lg">{error}</p>}

          <div className="form-control">
            <label className="label"><span className="label-text font-semibold">Email</span></label>
            <input type="email" name="email" placeholder="email@example.com" className="input input-bordered" required />
          </div>

          <div className="form-control mt-2">
            <label className="label"><span className="label-text font-semibold">Password</span></label>
            <input type="password" name="password" placeholder="••••••••" className="input input-bordered" required />
          </div>

          <div className="form-control mt-6">
            <button type="submit" disabled={loading} className="btn btn-primary bg-indigo-600 hover:bg-indigo-700 border-none text-white">
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>

          <div className="divider text-xs text-slate-400">OR</div>

          {/* Google Sign-in Button with Logo */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="btn btn-outline border-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            Continue with Google
          </button>

          <p className="text-center text-sm mt-4">
            Don't have an account? <Link href="/register" className="text-indigo-600 font-bold hover:underline">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
}