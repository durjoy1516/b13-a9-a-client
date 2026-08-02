import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-200 mt-20 pt-12 pb-6">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold text-indigo-400 mb-3">MediQueue</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Connecting eager students with top qualified tutors. Book instant online learning sessions and excel in your studies with expert guidance.
          </p>
        </div>

        {/* Learning Services Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white">Learning Services</h3>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><Link href="/tutors" className="hover:text-indigo-400 transition-colors">All Available Tutors</Link></li>
            <li><Link href="/tutors" className="hover:text-indigo-400 transition-colors">Medical Preparation</Link></li>
            <li><Link href="/tutors" className="hover:text-indigo-400 transition-colors">Mathematics & Physics</Link></li>
            <li><Link href="/tutors" className="hover:text-indigo-400 transition-colors">Online & Offline Sessions</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white">Contact Info</h3>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>Email: support@mediqueue.com</li>
            <li>Phone: +880 1700 000000</li>
            <li>Address: Dhaka, Bangladesh</li>
          </ul>
        </div>

        {/* Social Links with updated X logo */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-indigo-400 transition-colors" aria-label="Facebook">
              Facebook
            </a>
            <a href="#" className="hover:text-indigo-400 transition-colors" aria-label="LinkedIn">
              LinkedIn
            </a>
            <a href="#" className="hover:text-indigo-400 transition-colors flex items-center gap-1" aria-label="X Logo">
              <svg className="w-5 h-5 fill-current inline" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>
        </div>

      </div>

      <div className="border-t border-slate-800 text-center pt-6 text-xs text-slate-500">
        © {new Date().getFullYear()} MediQueue. All Rights Reserved.
      </div>
    </footer>
  );
}