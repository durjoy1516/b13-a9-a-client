import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h2 className="text-2xl font-bold text-primary mb-4">MediQueue</h2>
          <p className="text-sm text-slate-400">
            Connecting medical & science students with expert tutors effortlessly. Book your sessions today!
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-4 text-white">Quick Links</h3>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><Link href="/" className="hover:text-white">Home</Link></li>
            <li><Link href="/tutors" className="hover:text-white">Find Tutors</Link></li>
            <li><Link href="/login" className="hover:text-white">Login</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-4 text-white">Categories</h3>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>Medical Science</li>
            <li>Biology & Chemistry</li>
            <li>Physics & Health</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-4 text-white">Contact Us</h3>
          <p className="text-sm text-slate-400">Email: support@mediqueue.com</p>
          <p className="text-sm text-slate-400">Phone: +880 1700-000000</p>
        </div>
      </div>

      <div className="border-t border-slate-800 text-center py-4 text-sm text-slate-500">
        © {new Date().getFullYear()} MediQueue. All rights reserved.
      </div>
    </footer>
  );
}