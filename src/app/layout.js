import AuthProvider from '@/context/AuthProvider';
import { ThemeProvider } from '@/context/ThemeContext';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import { Toaster } from 'react-hot-toast';
import { Plus_Jakarta_Sans } from 'next/font/google'; // Suitable Google Font Import
import './globals.css';

// Google Font Configuration
const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
});

export const metadata = {
  title: 'MediQueue - Find Your Tutor',
  description: 'Book qualified tutors easily for medical and science education.',
  icons: {
    icon: '/assets/icon.png?v=2',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light" className={jakarta.className}>
      <body className="flex flex-col min-h-screen bg-base-100 text-base-content antialiased">
        <ThemeProvider>
          <AuthProvider>
            <Toaster position="top-center" />
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}