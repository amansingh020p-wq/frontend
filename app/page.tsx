'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AboutUs from '@/components/AboutUs';
import WhyChooseUs from '@/components/WhyChooseUs';
import TradingStats from '@/components/TradingStats';
import Steps from '@/components/Steps';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Footer2 from '@/components/Footer2';
import Awards from '@/components/Awards';
import TickerTap from '@/components/TickerTap';
import TrustedPartner from '@/components/TrustedPartner';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="min-h-screen">
      <Hero />
      <TickerTap />
      <AboutUs />
      <TrustedPartner />
      <WhyChooseUs />
      <TradingStats />
      <Steps />
      <Awards />
      <Contact />
    </main>
  );
}