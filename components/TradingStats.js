// // 'use client';

// // import { useEffect, useRef } from 'react';
// // import { Users, Package, Percent, CreditCard } from 'lucide-react';

// // const stats = [
// //   {
// //     icon: Users,
// //     value: '5,000,000+',
// //     label: 'Registered Users'
// //   },
// //   {
// //     icon: Package,
// //     value: '1,000+',
// //     label: 'Products'
// //   },
// //   {
// //     icon: Percent,
// //     value: 'From 0.0',
// //     label: 'pips Spreads'
// //   },
// //   {
// //     icon: CreditCard,
// //     value: '$0',
// //     label: 'Deposit Fees*'
// //   }
// // ];

// // export default function TradingStats() {
// //   const sectionRef = useRef();

// //   useEffect(() => {
// //     const observer = new IntersectionObserver(
// //       ([entry]) => {
// //         if (entry.isIntersecting) {
// //           entry.target.classList.add('visible');
// //         }
// //       },
// //       { threshold: 0.1 }
// //     );

// //     if (sectionRef.current) {
// //       observer.observe(sectionRef.current);
// //     }

// //     return () => observer.disconnect();
// //   }, []);

// //   return (
// //     <section 
// //       className="py-20 relative bg-cover bg-center bg-fixed"
// //       style={{
// //         backgroundImage: "url('https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80')"
// //       }}
// //     >
// //       <div className="absolute inset-0 bg-[#0e1f1b]/80 backdrop-blur-sm"></div>
      
// //       <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //         <div ref={sectionRef} className="section-transition">
// //           <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-16">
// //             Start Your Trading Now
// //           </h2>
          
// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
// //             {stats.map((stat, index) => (
// //               <div
// //                 key={index}
// //                 className="bg-[#0D1C19] border-[0.2px] border-grey-800 rounded-xl p-8 text-center transform transition-all duration-300 hover:scale-105"
// //               >
// //                 <div className="flex justify-center mb-4">
// //                   <stat.icon className="h-12 w-12 text-[#43b852]" />
// //                 </div>
// //                 <div className="text-2xl font-bold text-white mb-2">
// //                   {stat.value}
// //                 </div>
// //                 <div className="text-white/80">
// //                   {stat.label}
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
          
// //           <div className="text-center mt-12">
// //             <button className="bg-[#43b852] text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-[#0e1f1b] transition-all transform hover:scale-105">
// //               START NOW
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }


// 'use client';

// import { useEffect, useRef } from 'react';
// import { Users, Package, Percent, CreditCard } from 'lucide-react';

// const stats = [
//   {
//     icon: Users,
//     value: '5,000,000+',
//     label: 'Registered Users'
//   },
//   {
//     icon: Package,
//     value: '1,000+',
//     label: 'Products'
//   },
//   {
//     icon: Percent,
//     value: 'From 0.0',
//     label: 'pips Spreads'
//   },
//   {
//     icon: CreditCard,
//     value: '$0',
//     label: 'Deposit Fees*'
//   }
// ];

// export default function TradingStats() {
//   const sectionRef = useRef();

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           entry.target.classList.add('visible');
//         }
//       },
//       { threshold: 0.1 }
//     );

//     if (sectionRef.current) {
//       observer.observe(sectionRef.current);
//     }

//     return () => observer.disconnect();
//   }, []);

//   return (
//     <section 
//       className="py-16 md:py-24 relative bg-cover bg-center bg-fixed"
//       style={{
//         backgroundImage: "url('https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80')"
//       }}
//     >
//       <div className="absolute inset-0 bg-[#0e1f1b]/90 backdrop-blur-sm"></div>
      
//       <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div ref={sectionRef} className="section-transition">
//           <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-center mb-12 md:mb-16">
//             Start Your Trading Journey
//           </h2>
          
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
//             {stats.map((stat, index) => (
//               <div
//                 key={index}
//                 className="stats-card group relative overflow-hidden rounded-xl p-6 md:p-8 text-center transform transition-all duration-500 hover:scale-[1.03]"
//               >
//                 <div className="absolute inset-0 bg-[#0D1C19]/90 group-hover:bg-[#0D1C19]/70 transition-all duration-500"></div>
//                 <div className="relative z-10">
//                   <div className="flex justify-center mb-3 md:mb-6">
//                     <stat.icon className="h-10 w-10 md:h-12 md:w-12 text-[#43b852] group-hover:text-white transition-colors duration-300" />
//                   </div>
//                   <div className="text-xl md:text-3xl font-bold text-white mb-1 md:mb-2">
//                     {stat.value}
//                   </div>
//                   <div className="text-sm md:text-base text-white/80 group-hover:text-white/90 transition-colors duration-300">
//                     {stat.label}
//                   </div>
//                 </div>
//                 <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#43b852] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
//               </div>
//             ))}
//           </div>
          
//           <div className="text-center mt-12 md:mt-16">
//             <button className="cta-button bg-[#43b852] text-white px-8 py-3 md:px-10 md:py-4 rounded-full text-base md:text-lg font-semibold hover:bg-white hover:text-[#0e1f1b] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-[#43b852]/30">
//               START TRADING NOW
//               <span className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
//             </button>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         .section-transition {
//           opacity: 0;
//           transform: translateY(20px);
//           transition: opacity 0.8s ease-out, transform 0.8s ease-out;
//         }
//         .section-transition.visible {
//           opacity: 1;
//           transform: translateY(0);
//         }
//         .stats-card {
//           box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
//           border: 1px solid rgba(255, 255, 255, 0.05);
//         }
//         .stats-card:hover {
//           box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2), 0 5px 10px rgba(0, 0, 0, 0.1);
//         }
//         .cta-button {
//           position: relative;
//           overflow: hidden;
//         }
//       `}</style>
//     </section>
//   );
// }





'use client';

import { useEffect, useRef } from 'react';
import { Users, Package, Percent, CreditCard } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: '5,000,000+',
    label: 'Registered Users'
  },
  {
    icon: Package,
    value: '1,000+',
    label: 'Products'
  },
  {
    icon: Percent,
    value: 'From 0.0',
    label: 'pips Spreads'
  },
  {
    icon: CreditCard,
    value: '$0',
    label: 'Deposit Fees*'
  }
];

export default function TradingStats() {
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
    <section 
      className="py-12 md:py-20 relative bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80')"
      }}
    >
      <div className="absolute inset-0 bg-[#0e1f1b]/90 backdrop-blur-sm"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={sectionRef} className="section-transition">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12 md:mb-16">
            Start Your Trading Journey
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="stats-card group relative overflow-hidden rounded-xl p-6 md:p-8 text-center transform transition-all duration-500 hover:scale-[1.03]"
              >
                <div className="absolute inset-0 bg-[#0D1C19]/90 group-hover:bg-[#0D1C19]/70 transition-all duration-500"></div>
                <div className="relative z-10">
                  <div className="flex justify-center mb-3 md:mb-6">
                    <stat.icon className="h-10 w-10 md:h-12 md:w-12 text-[#43b852] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div className="text-xl md:text-3xl font-bold text-white mb-1 md:mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm md:text-base text-white/80 group-hover:text-white/90 transition-colors duration-300">
                    {stat.label}
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#43b852] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12 md:mt-16">
            <button className="cta-button bg-[#43b852] text-white px-6 py-2 md:px-8 md:py-3 rounded-full text-base md:text-lg font-semibold hover:bg-white hover:text-[#0e1f1b] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-[#43b852]/30">
              START TRADING NOW
              <span className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
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
        .stats-card {
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .stats-card:hover {
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2), 0 5px 10px rgba(0, 0, 0, 0.1);
        }
        .cta-button {
          position: relative;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}