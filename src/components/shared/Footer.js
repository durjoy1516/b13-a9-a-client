import Link from 'next/link';
import { FaFacebookF, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';

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

        {/* Social Links using react-icons */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white">Follow Us</h3>
          <div className="flex space-x-4 items-center text-lg">
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-indigo-400 transition-colors p-2 bg-slate-800 rounded-full" 
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-indigo-400 transition-colors p-2 bg-slate-800 rounded-full" 
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </a>
            <a 
              href="https://x.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-indigo-400 transition-colors p-2 bg-slate-800 rounded-full" 
              aria-label="X Logo"
            >
              <FaXTwitter />
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