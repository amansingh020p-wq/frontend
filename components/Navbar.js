'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Don't show navbar on admin routes
  const isAdminRoute = pathname.startsWith('/admin');
  const isUserRoute = pathname.startsWith('/dashboard');

  if (isAdminRoute) return null;
  if (isUserRoute) return null;

  const isHome = pathname === '/';

  useEffect(() => {
    if (!isHome) return;

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  // Close menu when clicking on a link
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('nav')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Determine styles based on page and scroll
  const bgClass = isHome
    ? scrolled
      ? 'bg-white/90 backdrop-blur-md shadow-md'
      : 'bg-transparent'
    : 'bg-white shadow-md';

  const textClass = isHome
    ? scrolled
      ? 'text-[#0e1f1b]'
      : (isOpen ? 'text-white' : 'text-black')
    : 'text-[#0e1f1b]';

  // Mobile menu background based on navbar state
  const mobileBg = isHome
    ? scrolled
      ? 'bg-white/95 backdrop-blur-md'
      : 'bg-white/40 backdrop-blur-md'
    : 'bg-white/95 backdrop-blur-md';

  // Mobile menu text color based on navbar state
  const mobileTextClass = isHome
    ? scrolled
      ? 'text-[#0e1f1b]'
      : 'text-black'
    : 'text-[#0e1f1b]';

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-300 ${bgClass}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2" onClick={handleLinkClick}>
                {/* Replace this image src with your actual logo path */}
                <img 
                  src="/assets/forexlogo2.png" 
                  alt="ForexFlow Logo" 
                  className="h-10 md:h-12 w-auto"
                />
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="/about-us" className={`${textClass} hover:text-[#43b852] transition-colors`}>
                About Us
              </Link>
              <Link href="/disclaimer" className={`${textClass} hover:text-[#43b852] transition-colors`}>
                Disclaimer
              </Link>
              <Link href="/privacy-&-policy" className={`${textClass} hover:text-[#43b852] transition-colors`}>
                Privacy Policy
              </Link>
              <Link href="/terms-&-conditions" className={`${textClass} hover:text-[#43b852] transition-colors`}>
                Terms & Conditions
              </Link>
              <Link href="/login" className={`${textClass} hover:text-[#43b852] transition-colors`}>
                Login
              </Link>
              <Link
                href="/kyc-registration"
                className="bg-[#43b852] text-white px-6 py-2 rounded-full hover:bg-[#0e1f1b] transition-colors"
              >
                Register
              </Link>
            </div>

            <div className="md:hidden">
              <button 
                onClick={() => setIsOpen(!isOpen)} 
                className={`${textClass} z-60 relative`}
                aria-label="Toggle navigation menu"
              >
                {isOpen ? <X className="h-6 w-6 text-black" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Full screen mobile menu overlay */}
      <div className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ease-in-out ${
        isOpen 
          ? 'opacity-100 visible' 
          : 'opacity-0 invisible'
      }`}>
        <div className={`absolute inset-0 ${mobileBg}`}>
          <div className="flex flex-col justify-center items-center h-full px-6">
            <div className="flex flex-col items-center space-y-8 text-center">
              <Link 
                href="/about-us" 
                className={`${mobileTextClass} hover:text-[#43b852] transition-colors text-2xl font-medium`}
                onClick={handleLinkClick}
              >
                About Us
              </Link>
              <Link 
                href="/disclaimer" 
                className={`${mobileTextClass} hover:text-[#43b852] transition-colors text-2xl font-medium`}
                onClick={handleLinkClick}
              >
                Disclaimer
              </Link>
              <Link 
                href="/privacy-&-policy" 
                className={`${mobileTextClass} hover:text-[#43b852] transition-colors text-2xl font-medium`}
                onClick={handleLinkClick}
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms-&-conditions" 
                className={`${mobileTextClass} hover:text-[#43b852] transition-colors text-2xl font-medium`}
                onClick={handleLinkClick}
              >
                Terms & Conditions
              </Link>
              <Link 
                href="/login" 
                className={`${mobileTextClass} hover:text-[#43b852] transition-colors text-2xl font-medium`}
                onClick={handleLinkClick}
              >
                Login
              </Link>
              <Link
                href="/kyc-registration"
                className="bg-[#43b852] text-white px-8 py-3 rounded-full hover:bg-[#0e1f1b] transition-colors text-xl font-medium mt-4"
                onClick={handleLinkClick}
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}