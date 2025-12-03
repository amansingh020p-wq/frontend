
'use client';

import { useEffect, useRef } from 'react';
import { UserPlus, FileCheck, Wallet, TrendingUp, Award, ArrowRight } from 'lucide-react';

const steps = [
  {
    icon: UserPlus,
    title: '1. Register Account',
    description: 'Quick and secure registration process'
  },
  {
    icon: FileCheck,
    title: '2. Verify Documents',
    description: 'Simple identity verification'
  },
  {
    icon: Wallet,
    title: '3. Fund Your Wallet',
    description: 'Multiple payment options'
  },
  {
    icon: TrendingUp,
    title: '4. Start Trading',
    description: 'Access global markets'
  }
];

const achievements = [
  'Best Forex Broker 2023',
  'Most Innovative Platform',
  'Excellence in Customer Service',
  'Best Trading Conditions'
];

export default function Steps() {
  const sectionRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="pb-12 md:pb-20 pt-12 md:pt-16 bg-white relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-[#d0e2d2]/10 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1642543492481-44e81e3914a6?auto=format&fit=crop&q=80')",
          opacity: 0.05
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={sectionRef} className="section-transition">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0e1f1b] text-center mb-12 md:mb-16">
            Open Account in 4 Simple Steps
          </h2>

          {/* Steps section - 2x2 grid on mobile */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-12 md:mb-16">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                <div className="absolute inset-0 bg-[#43b852]/20 rounded-xl transform group-hover:scale-105 transition-transform duration-300" />
                <div className="glassmorphism rounded-xl p-4 md:p-6 text-center transform transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 relative z-10 h-full">
                  <div className="flex justify-center mb-3 md:mb-4">
                    <step.icon className="h-8 w-8 md:h-12 md:w-12 text-[#43b852] transform group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-[#0e1f1b] mb-1 md:mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600">{step.description}</p>
                  {/* Mobile step connector */}
                  {index % 2 === 0 && index < steps.length - 1 && (
                    <div className="md:hidden absolute top-1/2 -right-2 transform -translate-y-1/2 z-20">
                      <div className="w-4 h-0.5 bg-[#43b852]"></div>
                    </div>
                  )}
                </div>
                {/* Desktop step connector */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                    <div className="w-8 h-0.5 bg-[#43b852]"></div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button - Centered with responsive sizing */}
          <div className="flex justify-center">
            <button className="bg-[#43b852] hover:bg-[#0e1f1b] text-white font-bold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center">
              Open Your Account Now
              <ArrowRight className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .section-transition {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        .section-transition.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .glassmorphism {
          backdrop-filter: blur(8px);
          background: rgba(255, 255, 255, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }
      `}</style>
    </section>
  );
}