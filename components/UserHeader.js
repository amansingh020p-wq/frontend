'use client';
import { useState, useEffect } from 'react';
import { Search, UserCircle, Menu, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import axios from 'utils/axios.js';

const UserHeader = ({ toggleMobileSidebar, onNameClick }) => {
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();

  String.prototype.toTitleCase = function() {
  return this.split(' ')
             .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
             .join(' ');
  };
  // State for user info
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Fetch user info from backend
    const fetchUser = async () => {
      try {
        const res = await axios.get('/user/dashboard'); // Make sure this sends cookies!
        setUser(res.data.user);
        setUserName(res.data?.user?.name || 'User');
      } catch (err) {
        // Handle error (e.g. not logged in)
        setUser(null);
        setUserName('User');
      }
    };
    fetchUser();
  }, []);

  return (
    <header className={cn(
      "h-16 border-b flex items-center justify-between px-4",
      "bg-background border-border",
      "dark:bg-background dark:border-border"
    )}>
      {/* Left Section: Menu + Title */}
      <div className="flex items-center">
        <button
          className="mr-2 p-2 rounded-md hover:bg-accent md:hidden dark:text-white"
          onClick={toggleMobileSidebar}
        >
          <Menu size={20} />
        </button>
        <h1 className="text-lg font-medium hidden md:block dark:text-white">Welcome! {userName.toTitleCase()}</h1>
      </div>

      {/* Right Section: Search + Theme Toggle + User Info */}
      <div className="flex items-center gap-4">
        {/* Search Input */}
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Search..."
            className="pl-9 pr-4 py-2 dark:text-white rounded-md border border-input bg-background w-64"
          />
          <Search
            className="absolute left-3 top-2.5 text-muted-foreground"
            size={18}
          />
        </div>

        {/* Theme Toggle */}
        <div className="flex items-center space-x-2">
          {/* Desktop: Switch + Icon */}
          <div className="hidden md:flex items-center space-x-2">
            <Switch
              checked={theme === 'dark'}
              onCheckedChange={toggleTheme}
              id="user-theme-mode"
            />
            <Label htmlFor="user-theme-mode" className="cursor-pointer">
              {theme === 'light' ? (
                <Sun size={20} className="text-muted-foreground" />
              ) : (
                <Moon size={20} className="text-muted-foreground" />
              )}
            </Label>
          </div>
          
          {/* Mobile: Only Icon (clickable) */}
          <button 
            className="md:hidden p-2 rounded-md hover:bg-accent"
            onClick={toggleTheme}
          >
            {theme === 'light' ? (
              <Sun size={20} className="text-muted-foreground" />
            ) : (
              <Moon size={20} className="text-muted-foreground" />
            )}
          </button>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-2">
          <div className="hidden md:block text-right">
            <div className="text-sm font-medium dark:text-[#F2F2F2]">
              <span
                style={{ cursor: 'pointer', fontWeight: 'bold' }}
                onClick={onNameClick}
              >
                {userName.toTitleCase()}
              </span>
            </div>
            <div className="text-xs text-muted-foreground">
              {user ? user.role || "User" : ""}
            </div>
          </div>
          <button 
            onClick={() => router.push('/dashboard/account-setting')}
            className="p-1 rounded-full hover:bg-accent"
          >
            <UserCircle size={32} className="text-muted-foreground" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default UserHeader;