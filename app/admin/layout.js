'use client';

import { useState } from 'react';
import AdminHeader from '../../components/AdminHeader';
import AdminSidebar from '../../components/AdminSidebar';
import { ThemeProvider } from '../../contexts/ThemeContext';
import { cn } from '../../lib/utils';

const AdminLayout = ({ children }) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  const closeMobileSidebar = () => {
    setMobileSidebarOpen(false);
  };

  return (
    <ThemeProvider>
      <div className="flex h-screen w-full overflow-hidden">
        {/* Desktop sidebar - always visible */}
        <div className="hidden md:block">
          <AdminSidebar />
        </div>

        {/* Mobile sidebar - conditionally shown */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            <div 
              className="fixed inset-0 bg-black/50"
              onClick={closeMobileSidebar}
            />
            <AdminSidebar 
              mobileSidebarOpen={mobileSidebarOpen} 
              onCloseMobileSidebar={closeMobileSidebar} 
            />
          </div>
        )}

        <div className="flex-1 flex flex-col overflow-hidden">
          <AdminHeader toggleMobileSidebar={toggleMobileSidebar} />
          <main className="flex-1 overflow-y-auto bg-background p-4 md:p-6">
            <div className="mx-auto max-w-7xl animate-fade-in">
              {children}
            </div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default AdminLayout;