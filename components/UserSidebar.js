'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Users, 
  UserPlus, 
  CreditCard, 
  Wallet, 
  TrendingUp, 
  DollarSign, 
  Settings, 
  ChevronLeft, 
  ChevronRight, 
  ArrowDownUp,
  HandCoins,
  Moon, 
  Sun,
  ChartCandlestick,
  History,
  Menu
} from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const SidebarItem = ({ icon: Icon, title, path, collapsed, onNavigate }) => {
  const pathname = usePathname();
  const isActive = pathname === path;
  const router = useRouter();

  const handleClick = (e) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(); // Close sidebar on mobile
      router.push(path); // Actually navigate to the page
    }
  };

  return (
    <Link
      href={path}
      onClick={handleClick}
      className={cn(
        'flex items-center gap-3 p-3 rounded-md transition-colors',
        'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
        'dark:text-muted-foreground dark:hover:bg-accent/50',
        collapsed ? 'justify-center' : 'px-4',
        isActive ? 'bg-accent text-accent-foreground dark:bg-accent/50' : ''
      )}
    >
      <Icon size={20} />
      {!collapsed && <span>{title}</span>}
    </Link>
  );
};

const AdminSidebar = ({ mobileSidebarOpen, onCloseMobileSidebar }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const menuItems = [
    { title: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { title: 'Transactions', icon: ArrowDownUp , path: '/dashboard/transactions' },
    { title: 'Deposit Money', icon: CreditCard, path: '/dashboard/deposit-money' },
    { title: 'Withdraw Money', icon: Wallet, path: '/dashboard/withdraw-money' },
    // { title: 'Buy Trades', icon: ChartCandlestick, path: '/dashboard/buy-trades' },
    // { title: 'Sell Trades', icon: DollarSign, path: '/dashboard/sell-trades' },
    { title: 'Trade Order History', icon: History, path: '/dashboard/trades-order-history' },
    // { title: 'Requests For Loan', icon: HandCoins, path: '/dashboard/loan' },
    { title: 'Account Settings', icon: Settings, path: '/dashboard/account-setting' },
  ];

  const handleNavigation = () => {
    if (isMobile && onCloseMobileSidebar) {
      onCloseMobileSidebar();
    }
  };

  const toggleSidebar = () => {
    if (isMobile) {
      if (onCloseMobileSidebar) {
        onCloseMobileSidebar();
      }
    } else {
      setCollapsed(!collapsed);
    }
  };

  return (
    <aside className={cn(
      "h-screen transition-all duration-300 flex flex-col border-r",
      "bg-card text-card-foreground border-border",
      isMobile ? "fixed z-50 w-64" : collapsed ? "w-16" : "w-64",
      isMobile && !mobileSidebarOpen ? "-translate-x-full" : "translate-x-0"
    )}>
      <div className="flex items-center justify-between p-4 h-16 border-b border-border">
        {(!collapsed || isMobile) && (
          <div className="font-bold text-xl text-foreground">
            User<span className="text-primary">Panel</span>
          </div>
        )}
        <button 
          onClick={toggleSidebar}
          className="p-1 rounded-md bg-accent text-accent-foreground hover:bg-accent/80"
        >
          {isMobile ? (
            <ChevronLeft size={18} />
          ) : collapsed ? (
            <ChevronRight size={18} />
          ) : (
            <ChevronLeft size={18} />
          )}
        </button>
      </div>

      <div className={cn(
        "flex flex-col gap-1 p-2 overflow-y-auto flex-grow",
        collapsed && !isMobile ? "items-center" : ""
      )}>
        {menuItems.map((item) => (
          <SidebarItem
            key={item.path}
            icon={item.icon}
            title={item.title}
            path={item.path}
            collapsed={collapsed && !isMobile}
            onNavigate={handleNavigation}
          />
        ))}
      </div>

      <div className="p-4 border-t border-border">
        <button 
          onClick={toggleTheme}
          className={cn(
            "flex items-center gap-3 p-3 rounded-md transition-colors w-full",
            "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
            "dark:text-muted-foreground dark:hover:bg-accent/50",
            collapsed && !isMobile ? "justify-center" : "justify-between"
          )}
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          {(!collapsed || isMobile) && <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>}
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;