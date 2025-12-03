'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

// Create a context for theme management
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const pathname = usePathname();
  const isDashboardOrAdmin = pathname?.startsWith('/dashboard') || pathname?.startsWith('/admin');

  const [theme, setTheme] = useState(() => {
    // if (typeof window === 'undefined') return 'light';
    if (typeof window === 'undefined') return 'dark';
    
    // For dashboard/admin pages, default to dark unless explicitly set to light
    if (isDashboardOrAdmin) {
      const savedTheme = localStorage.getItem('theme');
      return savedTheme || 'dark';
    }
    
    // For other pages, always light theme
    return 'light';
  });

  // Update theme when route changes
  useEffect(() => {
    if (isDashboardOrAdmin) {
      const savedTheme = localStorage.getItem('theme');
      if (!savedTheme) {
        setTheme('dark');
      }
    } else {
      setTheme('light');
    }
  }, [isDashboardOrAdmin]);

  // Apply theme to document
  useEffect(() => {
    if (isDashboardOrAdmin) {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('theme', theme);
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme, isDashboardOrAdmin]);

  const toggleTheme = () => {
    if (isDashboardOrAdmin) {
      setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, isDashboardOrAdmin }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};


