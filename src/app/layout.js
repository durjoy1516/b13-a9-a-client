import AuthProvider from '@/context/AuthProvider';
import { ThemeProvider } from '@/context/ThemeContext';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import { Toaster } from 'react-hot-toast';
import './globals.css';

export const metadata = {
  title: 'MediQueue - Find Your Tutor',
  description: 'Book qualified tutors easily for medical and science education.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
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