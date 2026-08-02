'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  // HTML এ থিম অ্যাপ্লাই করার হেলপার ফাংশন (Tailwind + DaisyUI)
  const applyTheme = (currentTheme) => {
    const root = document.documentElement;

    // ১. DaisyUI-এর জন্য data-theme সেট করা
    root.setAttribute('data-theme', currentTheme);

    // ২. Tailwind CSS-এর জন্য dark ক্লাস টগল করা
    if (currentTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  };

  useEffect(() => {
    // আগের সেভ হওয়া থিম থাকলে সেটা নিবে, তা না হলে লাইট থিম সেট করবে
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);