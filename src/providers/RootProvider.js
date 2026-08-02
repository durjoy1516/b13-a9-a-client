'use client';

import AuthProvider from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { Toaster } from 'react-hot-toast';

export default function RootProvider({ children }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Toaster position="top-right" reverseOrder={false} />
        {children}
      </AuthProvider>
    </ThemeProvider>
  );
}